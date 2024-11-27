import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role: string | undefined = request.cookies.get("role")?.value.trim();
  const url = request.nextUrl.pathname;

  const adminRoutes = [
    "/",
    "/posts",
    "/juegos",
    "/miembros",
    "/autoridades",
    "/eventos",
    "/impresiones"
  ];
  const devRoutes = ["/", "/juegos"];
  const impresionRoutes = ["/", "/impresiones"];
  const comunicationRoutes = ["/", "/posts", "/eventos"];

  if (!token && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token) {
    switch (role) {
      case '"Admin"':
        if (!adminRoutes.includes(url)) {
          return NextResponse.redirect(new URL("/", request.url));
        }
        break;
      case '"Desarrollador"':
        if (!devRoutes.includes(url)) {
          return NextResponse.redirect(new URL("/", request.url));
        }
        break;
      case '"Impresiones"':
        if (!impresionRoutes.includes(url)) {
          return NextResponse.redirect(new URL("/", request.url));
        }
        break;
      case '"Comunicación"':
        if (!comunicationRoutes.includes(url)) {
          return NextResponse.redirect(new URL("/", request.url));
        }
        break;
      default:
        console.log("Rol no reconocido:", role);
        return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/posts",
    "/juegos",
    "/miembros",
    "/autoridades",
    "/eventos",
    "/impresiones",
  ],
};