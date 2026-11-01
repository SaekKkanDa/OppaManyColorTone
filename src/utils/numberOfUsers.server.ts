import { getAdminDb } from '@Utils/aiRecommend/adminDb';

/** 같은 서버 인스턴스 안에서 Firestore 읽기를 줄이기 위한 캐시 시간 */
const CACHE_TTL_MS = 60 * 1000;
/** 홈 응답이 늦어지지 않도록, 이 시간 안에 못 읽으면 숫자 없이 그린다 */
const READ_TIMEOUT_MS = 1500;

let cached: { value: number; at: number } | null = null;

async function readNumberOfUsers(): Promise<number | null> {
  const snapshot = await getAdminDb()
    .collection('numberOfUsers')
    .doc('numberOfUsers')
    .get();
  const value = snapshot.get('numberOfUsers');
  return typeof value === 'number' ? value : null;
}

/**
 * 홈 서버 렌더링용 진단 참여자 수.
 * 실패하거나 늦으면 null 을 돌려주고, 브라우저에서 다시 불러온다.
 */
export async function getNumberOfUsersForSsr(): Promise<number | null> {
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.value;

  try {
    const value = await Promise.race([
      readNumberOfUsers(),
      new Promise<null>((resolve) =>
        setTimeout(() => resolve(null), READ_TIMEOUT_MS)
      ),
    ]);
    if (value !== null) cached = { value, at: Date.now() };
    return value ?? cached?.value ?? null;
  } catch (error) {
    console.error('[numberOfUsers] SSR read failed', error);
    return cached?.value ?? null;
  }
}
