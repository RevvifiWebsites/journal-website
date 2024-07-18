import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export async function middleware(request: NextRequest) {
    if(request.url.includes("/logged") && !request.cookies.get('token')){
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next();
}