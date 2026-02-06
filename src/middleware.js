import { NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl
    const publicPaths = ['/login']

    if (publicPaths.includes(pathname)) {
        return NextResponse.next()
    }

    const token = request.cookies.get('auth-token')?.value
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}