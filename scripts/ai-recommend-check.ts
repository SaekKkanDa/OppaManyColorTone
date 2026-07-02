/**
 * Phase 0 검증 스크립트 — OpenAI 이미지 분석 프롬프트 정확도/JSON 안정성 확인용.
 *
 * 사용법:
 *   yarn ai-recommend:check <image-path>
 *   yarn ai-recommend:check <image-path> --options ./sample-options.json
 *   yarn ai-recommend:check <image-path> --only mini
 *   yarn ai-recommend:check <image-path> --only full
 *
 * 요구사항:
 *   - .env.local 에 OPENAI_API_KEY 설정
 *   - image-path 는 로컬 JPEG/PNG 파일 (풀 얼굴 사진)
 *
 * 출력:
 *   - mini / full 각각의 응답 JSON, latency, tokens
 *   - confidence 비교 (임계값 0.7 튜닝 참고)
 *
 * ⚠ 이 스크립트의 SYSTEM_PROMPT / USER_PROMPT 는 Phase 1 에서
 *   src/utils/aiRecommend/prompt.ts 로 이동될 예정. 그 전까지는 여기와
 *   API 라우트가 동일 문구를 유지하도록 주의.
 */
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';

import OpenAI from 'openai';

type OptionInput = {
  type: string;
  color: string;
  name?: string;
};

const DEFAULT_OPTIONS: OptionInput[] = [
  { type: 'springwarm', color: '#ff6448', name: '봄 웜 (레드오렌지)' },
  { type: 'summercool', color: '#1cace1', name: '여름 쿨 (스카이블루)' },
  { type: 'autumndeep', color: '#7d5544', name: '가을 딥 (다크브라운)' },
  { type: 'winterbright', color: '#f91893', name: '겨울 브라이트 (핫핑크)' },
];

const SYSTEM_PROMPT = `You are a professional Korean personal color consultant.

Given a user's face photo and 4 color candidates, choose which single color best suits the person based on their skin undertone, eye color, and hair color.

You MUST respond with a JSON object matching this schema exactly:
{
  "recommendedType": string,   // one of the provided option types, verbatim. If the image has no clear face, return "NONE".
  "reasoning": string,          // 1-2 sentences in Korean
  "confidence": number          // 0.0 - 1.0
}

Do NOT include any text outside the JSON object.`;

const buildUserText = (options: OptionInput[]) =>
  `옵션:\n${JSON.stringify(options, null, 2)}\n\n가장 어울리는 하나를 골라주세요.`;

const MIME_BY_EXT: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

async function toDataUri(imagePath: string): Promise<string> {
  const buf = await readFile(imagePath);
  const ext = extname(imagePath).toLowerCase();
  const mime = MIME_BY_EXT[ext];
  if (!mime) {
    throw new Error(`Unsupported image extension: ${ext}`);
  }
  return `data:${mime};base64,${buf.toString('base64')}`;
}

type CallResult = {
  model: string;
  latencyMs: number;
  usage?: OpenAI.CompletionUsage;
  parsed: {
    recommendedType: string;
    reasoning: string;
    confidence: number;
  };
  raw: string;
};

async function callModel(
  openai: OpenAI,
  model: string,
  dataUri: string,
  options: OptionInput[],
): Promise<CallResult> {
  const started = Date.now();
  const completion = await openai.chat.completions.create({
    model,
    response_format: { type: 'json_object' },
    max_tokens: 200,
    temperature: 0.3,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: dataUri, detail: 'low' } },
          { type: 'text', text: buildUserText(options) },
        ],
      },
    ],
  });
  const latencyMs = Date.now() - started;
  const raw = completion.choices[0]?.message?.content ?? '';
  const parsed = JSON.parse(raw);
  return {
    model,
    latencyMs,
    usage: completion.usage,
    parsed,
    raw,
  };
}

function printResult(result: CallResult) {
  const { model, latencyMs, usage, parsed } = result;
  console.log(`\n=== ${model} ===`);
  console.log(`latency: ${latencyMs}ms`);
  if (usage) {
    console.log(
      `tokens: prompt=${usage.prompt_tokens} completion=${usage.completion_tokens} total=${usage.total_tokens}`,
    );
  }
  console.log(`recommendedType: ${parsed.recommendedType}`);
  console.log(`confidence:      ${parsed.confidence}`);
  console.log(`reasoning:       ${parsed.reasoning}`);
}

function parseCliArgs(argv: string[]) {
  const [, , ...rest] = argv;
  if (rest.length === 0) {
    throw new Error(
      'Usage: yarn ai-recommend:check <image-path> [--options <json-file>] [--only mini|full]',
    );
  }
  const imagePath = rest[0];
  let optionsPath: string | undefined;
  let only: 'mini' | 'full' | undefined;
  for (let i = 1; i < rest.length; i += 1) {
    const arg = rest[i];
    if (arg === '--options') {
      optionsPath = rest[i + 1];
      i += 1;
    } else if (arg === '--only') {
      const value = rest[i + 1];
      if (value !== 'mini' && value !== 'full') {
        throw new Error('--only must be "mini" or "full"');
      }
      only = value;
      i += 1;
    }
  }
  return { imagePath, optionsPath, only };
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'OPENAI_API_KEY is not set. Run with: yarn ai-recommend:check <image-path>\n' +
        '(package.json script uses --env-file=.env.local)',
    );
  }

  const { imagePath, optionsPath, only } = parseCliArgs(process.argv);
  const dataUri = await toDataUri(imagePath);
  const options: OptionInput[] = optionsPath
    ? JSON.parse(await readFile(optionsPath, 'utf-8'))
    : DEFAULT_OPTIONS;

  const openai = new OpenAI({ apiKey });

  const targets: Array<'mini' | 'full'> = only ? [only] : ['mini', 'full'];
  const modelIds: Record<'mini' | 'full', string> = {
    mini: 'gpt-4o-mini-2024-07-18',
    full: 'gpt-4o-2024-08-06',
  };

  console.log(`image:   ${imagePath}`);
  console.log(`options: ${options.map((o) => o.type).join(', ')}`);

  for (const key of targets) {
    try {
      const result = await callModel(openai, modelIds[key], dataUri, options);
      printResult(result);
    } catch (err) {
      console.error(`\n=== ${modelIds[key]} FAILED ===`);
      console.error(err);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
