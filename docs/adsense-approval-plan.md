# AdSense 승인 개선 계획

Google AdSense 계정이 "승인되지 않음" 상태로 거절된 원인을 추정하고, 재신청까지의 작업을 단계별로 정리한 문서.

- **작성일**: 2026-11-01
- **최종 업데이트**: 2026-11-01
- **대상 사이트**: https://omct.web.app
- **게시자 ID**: `pub-9551977219354865`

> 2장의 진단은 AdSense가 알려 준 공식 거절 사유가 아니다. Google 크롤러가 보는 운영 페이지를 직접 확인해서 추정한 원인이다. 그래서 공식 사유 확인을 Phase 0으로 둔다.

---

## 0. 진행 현황

| Phase | 내용 | 상태 |
| --- | --- | --- |
| 0 | 공식 거절 사유 확인 | 🔄 거절 메일 없음 · AdSense 사이트 세부정보 · 정책 센터 확인 필요 |
| 1 | 기술 정리 (sitemap, 번역 노출, 메타 태그, canonical) | ✅ 운영 반영 (#325) |
| 2 | 개인정보처리방침 · 소개 · 문의 페이지 | ✅ 운영 반영 (#325) |
| 2-GCP | 7일 자동 삭제 설정 (Storage 수명 주기, Firestore TTL) | ✅ 완료 (Storage 수명 주기 · Firestore TTL Serving) |
| 3 | 콘텐츠 보강 (12타입 상세, 가이드 글, 홈 소개) | ✅ 운영 반영 (#326) |
| 4 | Search Console 등록 후 재신청 | 🔄 sitemap 제출함 (2026-11-01) · 처리 대기 · 색인 범위 정리 미배포 |

**다음 할 일**
1. 색인 범위 정리(Phase 4) PR 머지 → `production` 배포
2. 배포 후 운영 sitemap이 34개 URL인지, `/result`와 `/image-upload`에 `noindex`가 있는지 확인
3. Search Console에 sitemap 다시 제출 → 상태가 "성공"인지 확인. 1주일이 지나도 "가져올 수 없음"이면 URL 검사의 실제 URL 테스트로 원인 확인
4. 주요 페이지 색인 확인 → 재신청
5. Phase 0: 거절 메일은 오지 않음. AdSense **사이트 → omct.web.app 세부정보**와 **정책 센터**에서 사유 확인 (없으면 "사유 미공개"로 기록)

---

## 1. 거절 당시 상태 (2026-11-01)

| 항목 | 상태 |
| --- | --- |
| AdSense 계정 | 거절됨. 화면에 "최종 승인 대기 중 / 계정이 승인되지 않았습니다"만 표시되고 구체적 사유 없음 |
| 정책 준수 체크박스 | 체크 안 됨. 재제출할 때 체크 필요 |
| `ads.txt` | ✅ 운영에서 200 (`google.com, pub-9551977219354865, DIRECT, f08c47fec0942fa0`) |
| 광고 스크립트 | `src/pages/_app.page.tsx`에서 모든 페이지에 로드 |
| 광고 슬롯 | `/result` 한 곳 (`src/components/AdSense`) |

---

## 2. 진단 결과

가장 가능성이 높은 거절 사유는 **"가치가 별로 없는 콘텐츠(Low value content)"** 다. 페이지에 글이 매우 적고, 번역 키 노출이나 임시 페이지 같은 미완성 신호가 겹쳐 있다.

확인 방법: 운영 페이지 HTML에서 `<script>`, `<style>`을 빼고 실제로 보이는 글자 수를 셌다(2026-11-01).

| # | 문제 | 근거 | 우선순위 | 조치 |
| --- | --- | --- | --- | --- |
| 1 | 페이지에 글이 너무 적음 | 보이는 글자 수: `/` 134자, `/choice-color` 26자, `/all-types-view` 186자, `/result` 675자 | 높음 | Phase 2(소개 페이지), Phase 3 |
| 2 | 번역 키 이름이 그대로 노출됨 | `/my-test-share`: 키는 로케일에 있지만 `serverSideTranslations`가 없어 서버 HTML에 번역이 안 들어감 / `/landing-temp`: 키 3개가 로케일에 없음 (어디서도 링크되지 않는 임시 페이지) | 높음 | ✅ Phase 1 |
| 3 | 개인정보처리방침·소개·문의 페이지 없음 | 광고 쿠키를 쓰고, 공유 기능에서 사진을 Firebase Storage에 올리며, AI 추천에서는 사진을 OpenAI로 보냄 | 높음 | ✅ Phase 2 |
| 4 | `robots.txt`, `sitemap.xml` 404 | 두 파일이 `public/`이 아니라 저장소 루트에 있어서 배포되지 않음 | 중간 | ✅ Phase 1 |
| 5 | 모든 페이지의 `<title>`이 같음 | `_app.page.tsx`에 하나로 고정. 페이지별 description 없음 | 중간 | ✅ Phase 1 |
| 6 | 결과 페이지 canonical이 모두 `springwarm` | `src/pages/result/index.page.tsx`에 하드코딩 → 12개 결과 페이지가 하나의 중복 페이지로 취급될 수 있음 | 높음 | ✅ Phase 1 |
| 7 | 참여자 수가 "0 people"로 보임 | 서버 HTML에서 카운터 값이 0이고, 브라우저에서 불러온 뒤에 바뀜 | 낮음 | ✅ Phase 3 |
| 8 | 글이 적은 페이지가 sitemap의 43% | 60개 중 `/result` 24개, `/image-upload` 2개. 본문 글자 수(`springwarm`, 영어/한국어): `/result` 약 830/470자, `/types` 약 4,540/2,690자. `/image-upload`(영어) 약 225자 | 높음 | 🔄 Phase 4 (미배포) |

광고 슬롯이 `/result` 한 곳뿐인 점은 거절 사유가 아니다. 심사는 광고 개수가 아니라 사이트 전체 콘텐츠를 본다. 단, Phase 4에서 `/result`를 `noindex`로 바꾸면서 광고 슬롯은 색인 대상이 아닌 페이지에만 남는다.

---

## 3. 실행 계획

### Phase 0. 공식 거절 사유 확인

- [x] AdSense에서 온 거절 메일 확인 → 메일 없음 (2026-11-01)
- [ ] AdSense → 사이트(Sites) 메뉴 / 정책 센터에서 사이트별 검토 결과 확인
- [ ] 사유가 2장 진단과 다르면 이 문서를 업데이트하고 우선순위 재조정

### Phase 1. 기술 정리 ✅

- [x] `robots.txt`, `sitemap.xml`을 `public/`으로 이동
  - sitemap: en/ko URL + hreflang으로 재작성 (Phase 2 포함 34개 URL)
  - robots: `/api/` 크롤링 차단
- [x] `/my-test-share`에 `serverSideTranslations` 추가 → 서버 HTML에 실제 문구 표시
- [x] `/landing-temp` 삭제 (참조 없음 확인)
- [x] `PageHead` 컴포넌트(`src/components/PageHead`)로 페이지별 title·description·canonical 설정
  - 기본 description/og 태그는 `_document`에서 `_app`으로 옮김. `_document`의 태그는 페이지에서 덮어쓸 수 없기 때문
  - 새 문구는 `common.json`의 `meta.*` 키 (ko/en)
- [x] 결과 페이지 canonical을 실제 `colorType`과 로케일 기준으로 수정
- [x] `/choice-color`, `/my-test-share`는 `noindex` (사용자별 진행·공유 화면)
  - `/choice-color`는 클라이언트 전용 래퍼(`withLoadingRouter`) 밖에 `PageHead`를 둬야 서버 HTML에 들어감
- [x] 참여자 수 카운터: Phase 3에서 해결 (서버에서 실제 숫자를 넣고 카운트업 유지)

**로컬 검증 (운영 빌드, 2026-11-01)**: 모든 대상 페이지 200, 페이지별 제목·canonical 정상, `/landing-temp` 404, 번역 키 노출 없음. `i18n-translation-reviewer`로 새 문구를 검토했고, 영어 홈 description을 155자 이내로 줄임.

### Phase 2. 정책·신뢰 페이지 ✅

- [x] `/privacy` 개인정보처리방침, `/about` 서비스 소개 (ko/en)
  - 문구: `public/locales/{ko,en}/legal.json`
  - 레이아웃: `src/components/InfoArticle` (문구 속 URL·이메일을 링크로 변환)
- [x] 문의처: 팀 이메일 `oppamanycolortone@gmail.com` + GitHub Issues. 운영 주체 표기는 `색깐다(SaekKkanDa)` (`src/constant/site.ts`)
- [x] `SiteFooter`(서비스 소개 · 개인정보처리방침 · 문의)를 홈, 12타입 전체보기, 결과, 소개, 개인정보처리방침 페이지에 추가
- [x] `next-i18next.config.js`의 `ns`에 `legal` 추가
  - 커스텀 백엔드가 없으면 `serverSideTranslations`는 config의 `ns`에 있는 namespace만 읽기 때문. 빠지면 `legal`이 빈 객체로 넘어가 키 이름이 노출됨
  - 다른 페이지 props에는 지금처럼 `common`만 실림 (확인 완료)

**개인정보처리방침에 적은 데이터 처리 (코드 기준으로 확인한 사실)**

| 데이터 | 처리 | 보관 |
| --- | --- | --- |
| 진단용 얼굴 사진 | 브라우저 안에서만 처리, 서버 전송 없음 | 저장 안 함 |
| 공유용 사진 | "내 진단 링크 공유" 이용 시 Firebase Storage `personal-images/`에 업로드 (파일명은 MD5 해시) | **7일 후 자동 삭제** |
| AI 추천 이미지 | 동의 시에만 축소 이미지(최대 800×800)를 OpenAI API로 전송 | 저장 안 함 (OpenAI 최대 30일 로그) |
| AI 추천 이용 기록 | 세션 ID, IP SHA-256 해시, 횟수·시각 (Firestore `aiRecommendRateLimit`) | **마지막 이용 후 7일 자동 삭제** |
| 이용 통계·광고 | Google Analytics, Tag Manager, AdSense 쿠키 | 각 제공자 정책 |
| 오류 정보 | Sentry 오류 + 세션 리플레이 (글자 마스킹, 미디어 차단) | 제공자 정책 |
| 브라우저 저장소 | AI 동의 여부, 온보딩 확인 여부 (localStorage) | 브라우저에만 |

**GCP 설정 (7일 자동 삭제)**

개인정보처리방침에 "7일 후 자동 삭제"를 약속했기 때문에, 배포 전에 아래 두 설정이 적용돼 있어야 한다. 두 설정 모두 실제 삭제는 조건 충족 후 최대 24시간 안에 일어난다.

| 대상 | 설정 | 상태 |
| --- | --- | --- |
| 공유용 사진 | Cloud Storage → 버킷 `oppamanycolortone-5fb42.appspot.com` → Lifecycle → Delete object, Age 7일, Prefix `personal-images/` | ✅ 2026-11-01 생성 확인 |
| AI 추천 이용 기록 | Firestore → `(default)` → TTL → Collection group `aiRecommendRateLimit`, Timestamp field `lastAt`, Expiration offset 7 days | ✅ 2026-11-01 Serving 확인 |

- TTL은 새 필드를 만들지 않고 기존 `lastAt`에 오프셋을 줬다. 세션·IP 문서 모두 이용할 때마다 `lastAt`을 갱신하므로 "마지막 이용 후 7일"이 되고, 기존 문서도 바로 삭제 대상이 된다. 그래서 코드 변경이 없다.
- 버킷 Protection이 Soft Delete라서, 수명 주기로 지운 파일도 소프트 삭제 보관 기간 동안은 복구 가능한 상태로 남는다. 공개 접근은 불가능하다. 복구용 안전장치라 유지한다.
- 수명 주기 규칙이 처음 적용되면 이미 7일이 지난 기존 공유 사진은 한꺼번에 삭제되고, 그 공유 링크도 동작하지 않는다.

**알려진 제약**

- 같은 사진으로 7일 안에 다시 공유하면 새로 업로드하지 않고 기존 파일을 재사용한다(`omctDb.sendPersonalImage`). 그래서 링크는 처음 업로드한 시점부터 7일 뒤에 만료된다. 필요하면 재업로드해서 보관 기간을 다시 시작하도록 바꾼다.

### Phase 3. 콘텐츠 보강 (승인 가능성에 가장 큰 영향)

| 작업 | 내용 | 비고 |
| --- | --- | --- |
| 12타입 상세 페이지 | 타입마다 설명, 팔레트, 잘 어울리는 색과 피해야 할 색, 대표 연예인, 메이크업·코디 팁. SSG로 생성 | `resultColorData.ts`, `common.json`의 기존 데이터 활용. 타입당 글 1,000자 이상 목표 |
| 퍼스널 컬러 가이드 글 | 퍼스널 컬러란, 웜/쿨 구분법, 4계절 12타입 체계, 자가진단 팁 | `docs/domain/personal-color-algorithm.md`, `/about` 문구 기반 |
| 홈 소개 섹션 | 첫 화면에 서비스 설명, 진단 화면에 가이드 버튼 | 홈 글자 수를 늘리고 내부 링크 확보 |

> 도메인 정확성은 `personal-color-domain-expert`, 번역은 `i18n-translation-reviewer` 에이전트로 검토한다.

**구현 (브랜치 `feat/adsense-phase3-content`)**

- [x] `/types/[type]`: 12타입 × ko/en = 24페이지 SSG (`getStaticPaths` fallback false). 본문은 `public/locales/{ko,en}/types.json` (타입당 한글 약 1,900~2,500자). 12타입 전체 JSON이 커서(페이지 데이터 150kB) i18n 네임스페이스로 넘기지 않고, `getStaticProps`에서 해당 타입 본문만 props로 넘긴다
  - 구성: 이동 경로, 이름·키워드·요약, 팔레트, 개요, 특징, 잘 어울리는/피할 컬러(스와치+설명), 메이크업, 코디, 헤어·액세서리, 연예인, 비슷한 유형 비교(함께 어울리는 유형 · 정반대 유형 링크), 진단 CTA
- [x] `/guide`: `public/locales/{ko,en}/guide.json` (한글 약 4,000자, 8개 섹션). 12타입 한 줄 요약과 하단 12타입 목록은 각 상세 페이지로 링크. 자주 묻는 질문은 Q와 A를 줄바꿈해 표시
- [x] 홈: 순서는 제목("퍼스널 컬러 자가진단") → 소개 문구 → 3D → 참여자 수 · 버튼(공유하기 · 컬러 유형 전체보기 · 퍼스널 컬러 가이드) → 푸터
  - 소개 문구는 짧게 두 문단 (`homeIntro`). 기존 "리트머스 페이스" 큰 제목은 없앰
  - 가이드 버튼은 `<a href="/guide">` 링크라 검색엔진이 따라갈 수 있음
  - 푸터는 버튼 아래 일반 흐름에 두어 하단 고정 시작 버튼에 가리지 않음
  - 페이지 높이는 `200dvh` 고정에서 내용 길이로 바꿈. 화살표 버튼은 첫 화면/참여자 수 화면 위치로 `scrollIntoView`
  - 첫 화면 판단은 3D 영역 맨 위의 작은 표시 요소(`TopSentinel`)로 함. 3D 영역 전체를 관찰하면 참여자 수 화면에서도 일부가 걸쳐 보여 숫자가 숨겨지는 문제가 있었음
- [x] 내부 링크: 결과 페이지·전체보기 → "<타입> 자세히 보기", 소개 → 가이드
- [x] 홈 참여자 수: `getServerSideProps`에서 Firebase Admin으로 읽어 서버 HTML에 실제 숫자를 넣음 (`src/utils/numberOfUsers.server.ts`)
  - 같은 서버 인스턴스에서 60초 캐시, 1.5초 안에 못 읽으면 숫자 없이 그리고 브라우저에서 기존처럼 불러옴
  - 화면에 보이기 전에는 실제 숫자, 보이면 0부터 카운트업 (애니메이션 유지)
  - CDN 캐시(`s-maxage`)는 쓰지 않음. `/` 의 언어 감지 리다이렉트가 캐시된 응답에 가려질 수 있어서
- [x] `sitemap.xml`: `/guide`와 `/types/*` 추가 (34 → 60개 URL)

### Phase 4. 재신청

- [x] Phase 1~3 배포 완료 (2026-11-01 운영에서 `/robots.txt`, `/sitemap.xml`, `/about`, `/privacy`, `/guide`, `/types/*` 200 확인)
- [x] Google Search Console에 sitemap(`https://omct.web.app/sitemap.xml`) 제출 (2026-11-01)
  - 제출 직후 상태는 "가져올 수 없음". 운영 파일은 200, XML 정상, robots 허용이라 처리 대기로 판단. Google 쪽 접근 여부는 아직 확인하지 못함
- [x] 색인 범위 정리 구현 (미배포)
  - `sitemap.xml`: `/result?colorType=*` 24개와 `/image-upload` 2개 제거 (60 → 34개 URL)
  - `/result`, `/image-upload`에 `noindex` 추가. sitemap에서 빼기만 하면 다른 경로로 색인될 수 있어서
  - canonical을 `/types`로 돌리지 않음. 두 페이지 내용이 달라 Google이 무시할 수 있어서
  - 공유 링크와 `/result` → `/types` 링크는 그대로 동작
- [ ] 색인 범위 정리 배포 후 sitemap 다시 제출
- [ ] 주요 페이지가 색인됐는지 확인 (보통 1~2주)
- [ ] AdSense에서 정책 준수 체크박스 체크 후 "다시 제출"

---

## 4. 예상 일정

추정치이며, Phase 0 결과와 작업 가능 시간에 따라 달라진다.

| Phase | 예상 소요 | 비고 |
| --- | --- | --- |
| 0. 사유 확인 | 당일 | |
| 1. 기술 정리 | 완료 | 운영 반영 |
| 2. 정책 페이지 | 완료 | 운영 반영 |
| 3. 콘텐츠 보강 | 완료 | 운영 반영 |
| 4. 색인 대기 후 재신청 | 1~2주 | |

---

## 5. 결정 사항

**결정됨 (2026-11-01)**

- [x] `/landing-temp` → 삭제 (어디서도 링크되지 않음)
- [x] 운영 주체 표기 → `색깐다(SaekKkanDa)`
- [x] 문의처 → `oppamanycolortone@gmail.com` + GitHub Issues
- [x] 공유용 사진 보관 기간 → 업로드 후 7일 자동 삭제
- [x] AI 추천 이용 기록 보관 기간 → 마지막 이용 후 7일 자동 삭제 (공유 사진과 맞춤)
- [x] 12타입 상세 페이지 URL 구조 → `/types/[type]`을 색인 대상으로 쓰고, `/result`와 `/image-upload`는 `noindex`

**남은 결정**

- [ ] AdSense 공식 거절 사유는 무엇인가? (Phase 0)
- [ ] 콘텐츠 글은 직접 쓸까, 초안을 받아 검수할까?
