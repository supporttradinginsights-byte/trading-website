'use client';

// ─── Firebase client (browser only) ─────────────────────────────────────────
//
//  This connects to the SAME Firebase project your Flutter app already
//  uses for auth — that's what makes "one account, works on the app and
//  the website" true. It does NOT touch, duplicate, or require changes to
//  the app's Firebase project; it's just a second (Web) app registered
//  under the same project.
//
//  To get these values: Firebase Console → Project settings → General →
//  "Your apps" → Add app → Web (</>) — if a web app isn't registered on
//  the project yet, adding one takes ~30 seconds and does not affect the
//  existing Android/iOS apps at all. Copy the resulting `firebaseConfig`
//  values into website/.env.local (see .env.local.example).
//
//  All of these are PUBLIC identifiers (safe to ship in client JS — this
//  is normal for Firebase Web apps; they are not secrets). The private
//  service-account credential used by the BACKEND (config/firebase.js)
//  is a completely separate, server-only file and is never exposed here.
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function isFirebaseConfigured() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
}

let _app = null;
let _auth = null;

export function getFirebaseAuth() {
  if (!isFirebaseConfigured()) return null;
  if (!_app) _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  if (!_auth) _auth = getAuth(_app);
  return _auth;
}

export const googleProvider = new GoogleAuthProvider();
