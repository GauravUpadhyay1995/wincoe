// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from './src/lib/verifyJWT';

// Paths to protect
const protectedRoutes = [
  '/api/v1/admin',
  '/api/v1/customers',
  '/api/v1/coupons',
  '/api/v1/clients',
  '/api/v1/profile',
  '/api/v1/dashboard',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) return NextResponse.next(); // Allow public routes

  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized: Token missing' },
      { status: 401 }
    );
  }

  const decoded = verifyJWT(token);

  if (!decoded) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized: Invalid token' },
      { status: 401 }
    );
  }

  // ✅ Optionally: attach user info to request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', (decoded as any).id);
  requestHeaders.set('x-user-email', (decoded as any).email);
  requestHeaders.set('x-user-role', (decoded as any).role);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
