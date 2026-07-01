# 퍼스널 컬러 진단 알고리즘

> 이 문서는 "오빠! 톤 많아?" 서비스의 핵심 도메인 로직인 **퍼스널 컬러 12타입 진단 알고리즘**을 정리한 문서입니다.

---

## 컬러 선택 로직

> ☝🏻 **퍼스널 컬러 타입 결정 방식**
>
> 사용자는 9번의 **메인 스테이지**를 거치고, 필요시 **보너스 스테이지**를 거쳐 본인의 퍼스널컬러 타입이 결정됩니다.

### 1단계 (메인 스테이지)

- 총 9번의 선택 (한번에 4개씩 등장, 각 3번의 기회)
  - 한 번에 컬러 4개씩 등장하니까 총 4 × 9 = 36개의 색이 등장
  - 12타입이 존재하니까 각 타입마다 3번씩 등장하게 됨
  - 아래 세 라운드를 세 번 반복 (봄, 여름, 가을, 겨울 모든 계절이 1개씩)
    1. `봄 웜, 여름 쿨, 가을 웜, 겨울 쿨` (트루끼리 비교. 만약 본인이 트루 타입이라면 계절에 따라 극명하게 갈린다)
    2. `봄 라이트, 여름 소프트, 가을 딥, 겨울 브라이트` (겹치는 속성·계절 없음)
    3. `봄 브라이트, 여름 라이트, 가을 소프트, 겨울 딥` (겹치는 속성·계절 없음)
- 한 번에 같은 계열의 컬러 4개씩 보여준다. (핑크면 핑크끼리, 블루면 블루끼리. 단, 오렌지와 퍼플은 예외)
- 가장 많이 선택받은 계절과 톤을 분류한다.
- 메인 스테이지는 모든 유저가 같은 선택지를 받게 된다.
- 9번까지해서 1등 타입이 발생하면, 최종 타입이 된다.
- 그렇지 않으면 가장 많이 선택한 타입 4개를 보너스단계에서 다시 선택.

### 보너스 스테이지

- 메인 스테이지에서 타입이 결정 안되었을 경우, 딱 1번의 선택으로 최종 타입 결정
- 여기서 선택되는 4가지 초이스는 메인 스테이지에서 가장 많은 공동 득표수를 받은 타입 4개
- 해당 타입의 색 4개가 한번에 같이 보임

---

## 용어 정리

```ts
season: ['spring', 'summer', 'autumn', 'winter']
tone:   ['light', 'deep', 'warm', 'cool', 'mute', 'bright']
```

> 타입 정의는 [`@types/color.d.ts`](../../@types/color.d.ts) 참고

## 퍼스널 컬러 12타입

`season × tone` 조합으로 총 12개의 최종 타입이 존재합니다.

| 계절 (Season) | 타입 (Type)      | 한글 명칭 |
| ------------- | ---------------- | --------- |
| Spring 봄     | `springwarm`     | 봄 웜     |
| Spring 봄     | `springbright`   | 봄 브라이트 |
| Spring 봄     | `springlight`    | 봄 라이트 |
| Summer 여름   | `summercool`     | 여름 쿨   |
| Summer 여름   | `summermute`     | 여름 뮤트(소프트) |
| Summer 여름   | `summerlight`    | 여름 라이트 |
| Autumn 가을   | `autumnwarm`     | 가을 웜   |
| Autumn 가을   | `autumnmute`     | 가을 뮤트(소프트) |
| Autumn 가을   | `autumndeep`     | 가을 딥   |
| Winter 겨울   | `wintercool`     | 겨울 쿨   |
| Winter 겨울   | `winterbright`   | 겨울 브라이트 |
| Winter 겨울   | `winterdeep`     | 겨울 딥   |

---

## 알고리즘 상세 (구현 기준)

### 1. 문항 데이터 구성

- 파일: [`src/data/choiceColorData.ts`](../../src/data/choiceColorData.ts)
- 9개의 색상 테마(문항) × 각 4개 선택지 = 총 36개의 컬러 옵션
- 각 옵션은 `season`, `tone`, `type`(=season+tone)을 속성으로 가짐

**테마 순서 및 라운드 축**

| # | 테마 | 비교 축 | 등장 타입 (spring / summer / autumn / winter) |
| - | ---- | ------- | ---------------------------------------------- |
| 1 | pink            | warm/cool    | springwarm / summercool / autumnwarm / wintercool |
| 2 | green           | bright/mute  | springbright / summermute / autumnmute / winterbright |
| 3 | brown/grey      | light/deep   | springlight / summerlight / autumndeep / winterdeep |
| 4 | blue            | warm/cool    | springwarm / summercool / autumnwarm / wintercool |
| 5 | red             | bright/mute  | springbright / summermute / autumnmute / winterbright |
| 6 | pink            | light/deep   | springlight / summerlight / autumndeep / winterdeep |
| 7 | orange/purple   | warm/cool    | springwarm / summercool / autumnwarm / wintercool |
| 8 | skyblue         | bright/mute  | springbright / summermute / autumnmute / winterbright |
| 9 | mint            | light/deep   | springlight / summerlight / autumndeep / winterdeep |

> (warm/cool → bright/mute → light/deep) 3개 라운드가 3번 반복되며, 모든 유저는 동일한 문항 순서를 받습니다. 선택지의 배열 순서만 문항마다 랜덤 셔플됩니다. (`src/pages/choice-color/index.page.tsx:59`)

### 2. 사용자 답변 누적

- 파일: [`src/pages/choice-color/index.page.tsx`](../../src/pages/choice-color/index.page.tsx), [`src/pages/choice-color/BasicStage/index.tsx`](../../src/pages/choice-color/BasicStage/index.tsx)
- 사용자의 매 선택마다 해당 옵션의 `ColorType`이 `selectedTypes: ColorType[]` 배열에 push됨
- 메인 스테이지 종료 시 총 9개의 `ColorType`이 쌓임

### 3. 스코어링 — 최빈값(Mode) 산출

- 파일: [`src/hooks/useSelectBonusColorTypes.ts`](../../src/hooks/useSelectBonusColorTypes.ts) (라인 41-56)
- 9개 선택 중 **가장 많이 등장한 `ColorType`(들)** 을 반환하는 단순 다수결 알고리즘

```ts
function getModeTypes(selectedTypes: ColorType[]) {
  const count: { [key: string]: number } = {};
  let maxFreq = 0;

  selectedTypes.forEach((selectedType) => {
    count[selectedType] = count[selectedType] + 1 || 1;
    if (count[selectedType] > maxFreq) maxFreq = count[selectedType];
  });

  return Object.entries(count)
    .filter(([, value]) => value === maxFreq)
    .map(([key]) => key);
}
```

### 4. 결과 분기 — 단일 최빈값 vs 동률

`useSelectBonusColorTypes.ts` 라인 24-35

- `modeTypes.length === 1` → 바로 `/result?colorType=<type>` 로 라우팅
- `modeTypes.length >= 2` → **보너스 스테이지** 진입

### 5. 보너스 스테이지 옵션 구성

- 파일: [`src/utils/getBonusColorOptions.ts`](../../src/utils/getBonusColorOptions.ts) (라인 12-57)
- 파일: [`src/pages/choice-color/BonusStage/index.tsx`](../../src/pages/choice-color/BonusStage/index.tsx)
- 동률 타입 개수에 따라 4개의 컬러 옵션 구성 방식이 달라짐

| 동률 타입 수 | 옵션 구성 |
| ----------- | --------- |
| 2개 | 각 타입의 `firstColors` + `secondColors` 4개 (2 × 2) |
| 3개 | 각 타입의 `firstColors` 3개 + 첫 번째 타입의 `secondColors` 1개 |
| 4개 | 각 타입의 `firstColors` 4개 |
| 5개 이상 (예외) | 기본 폴백: `['autumnmute', 'summercool', 'autumndeep', 'summerlight']` |

- 사용자가 4개 중 하나를 선택 → 그 선택지의 `type`이 최종 확정 타입

### 6. 결과 데이터 조회

- 파일: [`src/data/resultColorData.ts`](../../src/data/resultColorData.ts)
- 확정된 `ColorType`을 키로 다음 정보 조회:
  - `name` (한글 표시명)
  - `textColor` (브랜드 컬러)
  - `gridColors` / `bestColors` / `worstColors` (팔레트)
  - `tags` (특성 태그)
  - `celebrities` (동일 타입 연예인)
  - `secondaryType` / `worstType` (유사/상극 타입)

---

## 흐름도

```
┌──────────────────────────────┐
│  메인 스테이지 (9문항)         │
│  4지선다 × 9번 = 36색 노출     │
│  → selectedTypes: ColorType[] │
└──────────────┬───────────────┘
               │
               ▼
       ┌───────────────┐
       │ getModeTypes()│  (최빈값 산출)
       └───────┬───────┘
               │
       ┌───────┴───────┐
       │               │
       ▼               ▼
  단일 최빈값       동률 (2~4개)
       │               │
       │               ▼
       │      ┌──────────────────┐
       │      │ 보너스 스테이지    │
       │      │ 4개 컬러 중 1개 선택│
       │      └────────┬─────────┘
       │               │
       ▼               ▼
   ┌─────────────────────────┐
   │ 최종 ColorType 확정       │
   │ → /result?colorType=... │
   └─────────────────────────┘
```

---

## 주요 파일 정리

| 파일 | 역할 |
| ---- | ---- |
| `@types/color.d.ts` | `ColorSeason` / `ColorTone` / `ColorType` 타입 정의 |
| `src/data/choiceColorData.ts` | 9문항 × 4선택지 컬러 데이터 |
| `src/data/bonusColorData.ts` | 보너스 스테이지용 타입별 대표 컬러 팔레트 |
| `src/data/resultColorData.ts` | 12타입 최종 결과 데이터 (팔레트/태그/연예인 등) |
| `src/pages/choice-color/index.page.tsx` | 메인/보너스 스테이지 라우팅 및 상태 관리 |
| `src/pages/choice-color/BasicStage/index.tsx` | 메인 스테이지 UI |
| `src/pages/choice-color/BonusStage/index.tsx` | 보너스 스테이지 UI |
| `src/hooks/useSelectBonusColorTypes.ts` | **핵심 스코어링 로직** (최빈값 함수) |
| `src/utils/getBonusColorOptions.ts` | 보너스 스테이지 옵션 구성 |
| `src/pages/result/index.logic.ts` | 결과 페이지 라우팅 및 데이터 조회 |
