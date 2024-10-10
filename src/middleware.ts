import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const role = request.cookies.get('role')?.value;

  if (!token && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token) {
    const url = request.nextUrl.pathname;

    const adminRoutes = ["/posts", "/juegos", "/miembros", "/autoridades", "eventos"];
    const devRoutes = ["/juegos"];
    const comunicationRoutes = ["/posts", "/eventos"];

    if (role === "Admin" && !adminRoutes.includes(url)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (role === "Desarrollador" && !devRoutes.includes(url)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (role === "Comunicación" && !comunicationRoutes.includes(url)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/login", "/posts", "/juegos", "/miembros", "/autoridades", "/eventos"],
};