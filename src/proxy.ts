import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth-edge';

export default async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;
    console.log(`Proxy: ${request.method} ${path}`);

    // Define paths that are public
    const isPublicPath = path === '/' || path === '/login' || path === '/signup';

    // Define protected paths (starts with /dashboard)
    const isProtectedPath = path.startsWith('/dashboard');

    const token = request.cookies.get('token')?.value || '';

    if (isProtectedPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    if (isProtectedPath && token) {
        const payload = await verifyToken(token);
        if (!payload) {
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        }
    }

    if (isPublicPath && token && path !== '/') {
        // If user is already logged in and tries to access login/signup, redirect to dashboard
        // But we need to verify token first
        const payload = await verifyToken(token);
        if (payload) {
            return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/dashboard/:path*',
    ],
};
