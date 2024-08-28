import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";

import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Tablero dinamico para el manejo del gamecenter",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AppContextProvider>
            <html lang="en" className="scroll-smooth">
                <head>
                    <link rel="icon" href="/" sizes="any" />{" "}
                    <link
                        rel="icon"
                        href="/images/logo-susti.png"
                        type="image/<generated>"
                        sizes="<generated>"
                    />
                    <meta name="author" content="SusTi"></meta>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                </head>
                <body className={inter.className}>
                    {children}
                    <Toaster />
                </body>
            </html>
        </AppContextProvider>
    );
}
