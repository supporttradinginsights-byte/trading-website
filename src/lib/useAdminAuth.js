'use client';

import { useCallback, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { getFirebaseAuth, isFirebaseConfigured } from './firebaseClient';

// ─── Admin session (ISOLATED to /admin) ─────────────────────────────────────
//
//  Sign-in uses the SAME Firebase project + the SAME admin account your
//  Flutter admin app already uses — "is this uid an admin" is decided
//  entirely by your existing backend (ADMIN_UIDS / User.isAdmin /
//  Firebase RTDB admins/{uid}), not by anything here. This hook just:
//    1. Signs in with Firebase (email/password)
//    2. Exchanges that for a real 15-minute admin JWT via the existing
//       POST /api/v1/admin/issue-token (through the server-side proxy —
//       see app/api/admin/issue-token/route.js)
//    3. Keeps that JWT in sessionStorage (cleared when the tab closes —
//       appropriate for a short-lived admin credential) and silently
//       re-issues it before it expires, as long as Firebase is still
//       signed in.
// ─────────────────────────────────────────────────────────────────────────────

const SESSION_KEY = 'ti_admin_session'; // sessionStorage: { token, expiresAt, email }
const DEVICE_KEY = 'ti_admin_device_id'; // localStorage: stable per-browser id

function getDeviceId() {
  if (typeof window === 'undefined') return null;
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = 'web-' + crypto.randomUUID();
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

function readSession() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(session) {
  if (typeof window === 'undefined') return;
  if (session) sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else sessionStorage.removeItem(SESSION_KEY);
}

async function issueAdminToken(idToken) {
  const res = await fetch('/api/admin/issue-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken, deviceId: getDeviceId() }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    const err = new Error(data.message || data.error || 'Admin sign-in failed');
    err.code = data.code;
    throw err;
  }
  return data; // { ok, token, expiresIn }
}

export function useAdminAuth() {
  const [session, setSession] = useState(() => readSession());
  const [loading, setLoading] = useState(true);
  const configured = isFirebaseConfigured();

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, () => setLoading(false));
    return unsub;
  }, []);

  const signIn = useCallback(async (email, password) => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error('Admin sign-in is not configured yet.');

    const cred = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await cred.user.getIdToken();

    try {
      const { token, expiresIn } = await issueAdminToken(idToken);
      const next = { token, expiresAt: Date.now() + expiresIn * 1000, email: cred.user.email };
      writeSession(next);
      setSession(next);
      return next;
    } catch (err) {
      // This Firebase account is valid but isn't an admin (or this device
      // isn't allowlisted) — don't leave a half-signed-in state behind.
      await firebaseSignOut(auth).catch(() => {});
      if (err.code === 'UNKNOWN_DEVICE') {
        err.message = `${err.message} (Device ID: ${getDeviceId()})`;
      }
      throw err;
    }
  }, []);

  const signOut = useCallback(async () => {
    writeSession(null);
    setSession(null);
    const auth = getFirebaseAuth();
    if (auth) await firebaseSignOut(auth).catch(() => {});
  }, []);

  // Silently re-issue the admin JWT using the still-signed-in Firebase
  // session, without asking for a password again.
  const refresh = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth?.currentUser) throw new Error('Not signed in');
    const idToken = await auth.currentUser.getIdToken(true);
    const { token, expiresIn } = await issueAdminToken(idToken);
    const next = { token, expiresAt: Date.now() + expiresIn * 1000, email: auth.currentUser.email };
    writeSession(next);
    setSession(next);
    return next;
  }, []);

  // Authenticated fetch helper for /api/v1/web/admin/* — attaches
  // X-Admin-Token, refreshing first if the current token is stale/missing.
  const adminFetch = useCallback(
    async (path, opts = {}) => {
      const base = process.env.NEXT_PUBLIC_API_URL;
      let current = readSession();

      if (!current || current.expiresAt - Date.now() < 60_000) {
        current = await refresh();
      }

      const isFormData = typeof FormData !== 'undefined' && opts.body instanceof FormData;

      const res = await fetch(`${base}${path}`, {
        ...opts,
        headers: {
          ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
          'X-Admin-Token': current.token,
          ...(opts.headers || {}),
        },
      });

      if (res.status === 401 || res.status === 403) {
        writeSession(null);
        setSession(null);
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Admin session expired — please log in again.');
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Request failed: ${res.status}`);
      return data;
    },
    [refresh]
  );

  return { session, loading, configured, signIn, signOut, adminFetch, getDeviceId };
}
