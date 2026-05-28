import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User, Auth } from 'firebase/auth';

let app: FirebaseApp;
let auth: Auth;
let googleProvider: GoogleAuthProvider;

function getFirebase() {
  if (typeof window === 'undefined') return null;
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return null;

  if (!app) {
    app = getApps().length === 0
      ? initializeApp({
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        })
      : getApps()[0];
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  }
  return { auth, googleProvider };
}

export function getFirebaseAuth(): Auth | null {
  return getFirebase()?.auth ?? null;
}

export function signInWithGoogle() {
  const fb = getFirebase();
  if (!fb) throw new Error('Firebase not configured. Add NEXT_PUBLIC_FIREBASE_* to .env.local');
  return signInWithPopup(fb.auth, fb.googleProvider);
}

export function signOutUser() {
  const fb = getFirebase();
  if (!fb) return Promise.resolve();
  return signOut(fb.auth);
}

export function subscribeToAuth(callback: (u: User | null) => void) {
  const fb = getFirebase();
  if (!fb) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(fb.auth, callback);
}

export type { User };
