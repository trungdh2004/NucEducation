import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/", "/sessions"];
const publicRoutes = ["/auth/login", "/auth/signup", "/auth/verifyEmail"];
const privateStartRoutes = ["/reports", "/library", "/quiz"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isStartWith = privateStartRoutes.some((item) => {
    const check = path.startsWith(item);
    return check;
  });
  const accessToken = req.cookies.get("accessToken")?.value;

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isStartWith && !accessToken) {
    console.log({
      path,
      accessToken,
    });

    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/login",
    "/auth/signup",
    "/auth/verifyEmail",
    "/library/:path*",
    "/reports/:path*",
  ],
};
