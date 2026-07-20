// ─── Admin login proxy (server-side ONLY) ───────────────────────────────────
//
//  Forwards to your EXISTING, unmodified backend endpoint:
//    POST /api/v1/admin/issue-token
//  (see backend/src/routes/admin.routes.js — this route already exists and
//  already powers your Flutter admin app's login; nothing new was added to
//  the backend for this).
//
//  Why this proxy exists at all: that backend endpoint requires an
//  `X-App-Secret` header (a shared secret that also gates every other
//  mobile-app API call). It CANNOT be sent directly from browser
//  JavaScript — anything in client-side code is visible to anyone via
//  devtools, which would leak the same secret that protects your entire
//  app's API surface. So this one call is proxied through a Next.js
//  server route instead, where `ADMIN_APP_SECRET` (set in `.env.production`,
//  deliberately NOT prefixed `NEXT_PUBLIC_`) never reaches the browser.
//
//  Every subsequent admin request (Learning Center CRUD, contact messages)
//  goes straight from the browser to the backend's /api/v1/web/admin/*
//  routes with just the short-lived admin JWT this returns — those routes
//  are exempted from the X-App-Secret check (see server.js), so no
//  proxying is needed for them.
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const appSecret = process.env.ADMIN_APP_SECRET;

  if (!apiUrl) {
    return Response.json({ ok: false, error: 'NEXT_PUBLIC_API_URL is not configured.' }, { status: 500 });
  }

  let idToken, deviceId;
  try {
    const body = await req.json();
    idToken = body.idToken;
    deviceId = body.deviceId;
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
  }

  if (!idToken) {
    return Response.json({ ok: false, error: 'Missing Firebase ID token' }, { status: 400 });
  }

  const headers = {
    Authorization: `Bearer ${idToken}`,
    'Content-Type': 'application/json',
  };
  // Only attach these if actually configured, so a deployment that hasn't
  // set APP_SECRET/device-id yet degrades to "whatever the backend itself
  // requires" instead of sending literal "undefined" strings.
  if (appSecret) headers['X-App-Secret'] = appSecret;
  if (deviceId) headers['X-Device-Id'] = deviceId;

  try {
    const backendRes = await fetch(`${apiUrl}/api/v1/admin/issue-token`, {
      method: 'POST',
      headers,
      cache: 'no-store',
    });
    const data = await backendRes.json().catch(() => ({}));
    return Response.json(data, { status: backendRes.status });
  } catch (err) {
    return Response.json({ ok: false, error: 'Could not reach the API server.' }, { status: 502 });
  }
}
