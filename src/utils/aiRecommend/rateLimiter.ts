import { createHash } from 'node:crypto';

import { FieldValue } from 'firebase-admin/firestore';

import { getAdminDb } from './adminDb';

export const SESSION_MAX = 9;
export const IP_DAILY_MAX = 30;

const COLLECTION = 'aiRecommendRateLimit';

export type RateLimitResult =
  | { ok: true; sessionRemaining: number; ipRemaining: number }
  | {
      ok: false;
      scope: 'session' | 'ip';
      retryAfterSeconds: number;
    };

function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 32);
}

function todayKey(now = new Date()): string {
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

function secondsUntilUtcMidnight(now = new Date()): number {
  const next = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0,
      0,
      0,
    ),
  );
  return Math.max(1, Math.floor((next.getTime() - now.getTime()) / 1000));
}

export async function checkAndConsume(
  sessionId: string,
  ip: string,
): Promise<RateLimitResult> {
  const db = getAdminDb();
  const now = new Date();
  const dayKey = todayKey(now);
  const ipDocId = `ip_${hashIp(ip)}_${dayKey}`;
  const sessionDocId = `session_${sessionId}`;

  const ipRef = db.collection(COLLECTION).doc(ipDocId);
  const sessionRef = db.collection(COLLECTION).doc(sessionDocId);

  return db.runTransaction(async (tx) => {
    const [ipSnap, sessionSnap] = await Promise.all([
      tx.get(ipRef),
      tx.get(sessionRef),
    ]);

    const sessionCount = (sessionSnap.data()?.count as number | undefined) ?? 0;
    if (sessionCount >= SESSION_MAX) {
      return {
        ok: false as const,
        scope: 'session' as const,
        retryAfterSeconds: secondsUntilUtcMidnight(now),
      };
    }

    const ipCount = (ipSnap.data()?.count as number | undefined) ?? 0;
    if (ipCount >= IP_DAILY_MAX) {
      return {
        ok: false as const,
        scope: 'ip' as const,
        retryAfterSeconds: secondsUntilUtcMidnight(now),
      };
    }

    tx.set(
      sessionRef,
      {
        count: FieldValue.increment(1),
        lastAt: FieldValue.serverTimestamp(),
        ...(sessionSnap.exists
          ? {}
          : { firstAt: FieldValue.serverTimestamp() }),
      },
      { merge: true },
    );
    tx.set(
      ipRef,
      {
        count: FieldValue.increment(1),
        day: dayKey,
        lastAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return {
      ok: true as const,
      sessionRemaining: SESSION_MAX - (sessionCount + 1),
      ipRemaining: IP_DAILY_MAX - (ipCount + 1),
    };
  });
}
