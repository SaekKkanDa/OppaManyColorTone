import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

let cachedApp: App | null = null;
let cachedDb: Firestore | null = null;

function initAdminApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (serviceAccountJson) {
    return initializeApp({
      credential: cert(JSON.parse(serviceAccountJson)),
    });
  }

  return initializeApp();
}

export function getAdminDb(): Firestore {
  if (cachedDb) return cachedDb;
  if (!cachedApp) cachedApp = initAdminApp();
  cachedDb = getFirestore(cachedApp);
  return cachedDb;
}
