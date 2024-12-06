import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

export default async function middleware(request: NextRequest) {
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

  let verifier;
  try {
    if (token) {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_MYSECRET as string));
      verifier = payload;
    }
  } catch (error) {
    console.error("Error al verificar el token:", error);
    verifier = false;
  }

  if (!verifier && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (verifier && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (verifier) {
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