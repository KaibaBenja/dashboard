"use client";

import Link from "next/link";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { usePathname } from "next/navigation";

import { Header } from "./header";
import { Navigation } from "./nav-list";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CgArrowsExchangeAlt } from "react-icons/cg";
import { FaCircleUser } from "react-icons/fa6";
import { MobileNavigation } from "./nav-list-mobile";

interface UserInfo {
    username: string;
    role: string;
    token: string;
}

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();
    const cookies = parseCookies();
    const { logout } = useContext(AppContext)!;
    const [userInfo, setUserInfo] = useState<UserInfo>({ username: '', role: '', token: '' });
    const [selectedView, setSelectedView] = useState<string>("Home");

    useEffect(() => {
        const userInfo: UserInfo = {
            username: cookies.user ? JSON.parse(cookies.user) : '',
            role: cookies.role ? JSON.parse(cookies.role) : '',
            token: cookies.token || ''
        };
        setUserInfo(userInfo);

        const currentPath = pathname.split("/").pop();
        if (currentPath) {
            setSelectedView(currentPath.charAt(0).toUpperCase() + currentPath.slice(1));
        }
    }, [cookies.role, cookies.token, cookies.user, pathname]);

    return (
        <div id="header" className="grid lg:min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
            <div className="border-r bg-muted/40 lg:block">
                <Navigation userRole={`${userInfo?.role}`} />
                <MobileNavigation
                    user={userInfo}
                    selectedRoute={selectedView}
                    logout={logout}
                />
                {/* <div className="flex lg:hidden items-center justify-between px-6 h-12">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center font-mono bg-green-800 text-[#FFFFFF] px-2 py-1 rounded-lg capitalize gap-2 mr-4">
                                {selectedView} <CgArrowsExchangeAlt className="h-5 w-5" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuRadioGroup defaultValue={selectedView} className="text-lg font-semibold pr-4">
                                <DropdownMenuRadioItem value="Posts">
                                    <Link href="/posts">Posts</Link>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Juegos">
                                    <Link href="/juegos">Juegos</Link>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Miembros">
                                    <Link href="/miembros">Miembros</Link>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Autoridades">
                                    <Link href="/autoridades">Autoridades</Link>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Eventos">
                                    <Link href="/eventos">Eventos</Link>
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center text-green-800 capitalize gap-2 mr-4">
                                <span className="hidden md:block">{userInfo.username}</span> <FaCircleUser className="h-7 w-7 mb-1" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuRadioGroup value="menu">
                                <DropdownMenuRadioItem className="pr-4" value="usuario">Usuario: {userInfo.username}</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="role">Rol: {userInfo.role}</DropdownMenuRadioItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioItem className="cursor-pointer bg-green-800 text-[#FFFFFF] p-2 rounded-md flex justify-center" value="logout" onClick={logout}>Cerrar Sesión</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div> */}
            </div>
            <div className="flex flex-col">
                <Header section={`${selectedView}`} />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}