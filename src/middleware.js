import { NextResponse } from 'next/server';

// Two things this does, both narrowly scoped to /admin:
//
// 1. X-Robots-Tag: noindex — belt-and-suspenders on top of the
//    /admin disallow rule in robots.js. robots.txt only stops crawling;
//    a disallowed URL that gets linked from elsewhere can still show up in
//    search results with no content. This header tells search engines
//    never to index it even if that happens.
//
// 2. That's it — there's no server-side session gating here. Admin auth
//    state lives in the browser (sessionStorage, via useAdminAuth.js), not
//    a cookie middleware could read, so the actual "are you logged in"
//    check happens client-side in src/app/admin/layout.jsx.
export function middleware(request) {
  const res = NextResponse.next();
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
