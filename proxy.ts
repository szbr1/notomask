import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);

    // if (!sessionCookie) {
	// 	return NextResponse.redirect(new URL("/auth/sign-in", request.url));
	// }

	if (!sessionCookie && !request.nextUrl.pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/auth/sign-in", request.url));
	}

    if(sessionCookie && (request.nextUrl.pathname === "/auth/sign-in" || request.nextUrl.pathname === "/auth/sign-up")){
		return NextResponse.redirect(new URL("/home", request.url));
    }

	return NextResponse.next();
}

export const config = {
	matcher: [ "/home", "/auth/:path*"] // Specify the routes the middleware applies to
};