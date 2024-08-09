"use client";

import Link from "next/link";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { usePathname } from "next/navigation";

import { Header } from "./header";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TbFileText } from "react-icons/tb";
import { MdOutlineShield } from "react-icons/md";
import { LuGamepad, LuUsers } from "react-icons/lu";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";

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
    const [selectedView, setSelectedView] = useState<string>("");

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

    const handleViewChange = (view: string) => {
        setSelectedView(view);
    };

    return (
        <div id="header" className="grid lg:min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
            <div className="border-r bg-muted/40 lg:block">
                <div className="hidden lg:flex bg-[#66cc00] h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[80px] items-center text-[#FFFFFF] border-b px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <span className="font-mono text-2xl font-bold text-center">GameCenter Dashboard</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start gap-6 px-4 text-sm font-medium">
                            <Link href="posts" className="flex flex-col items-center text-[#FFFFFF] hover:cursor-pointer hover:bg-green-800 hover:bg-opacity-30 py-3 rounded-2xl">
                                <TbFileText className="h-12 lg:w-8 w-12 lg:h-8" />
                                <h1 className="font-semibold text-xl">Posts</h1>
                            </Link>
                            <Link href="juegos" className="flex flex-col items-center text-[#FFFFFF] hover:cursor-pointer hover:bg-green-800 hover:bg-opacity-30 py-3 rounded-2xl">
                                <LuGamepad className="h-12 lg:w-8 w-12 lg:h-8" />
                                <h1 className="font-semibold text-xl">Juegos</h1>
                            </Link>
                            <Link href="miembros" className="flex flex-col items-center text-[#FFFFFF] hover:cursor-pointer hover:bg-green-800 hover:bg-opacity-30 py-3 rounded-2xl">
                                <LuUsers className="h-12 lg:w-8 w-12 lg:h-8" />
                                <h1 className="font-semibold text-xl">Miembros</h1>
                            </Link>
                            <Link href="autoridades" className="flex flex-col items-center text-[#FFFFFF] hover:cursor-pointer hover:bg-green-800 hover:bg-opacity-30 py-3 rounded-2xl">
                                <MdOutlineShield className="h-12 lg:w-8 w-12 lg:h-8" />
                                <h1 className="font-semibold text-xl">Autoridades</h1>
                            </Link>
                            <Link href="eventos" className="flex flex-col items-center text-[#FFFFFF] hover:cursor-pointer hover:bg-green-800 hover:bg-opacity-30 py-3 rounded-2xl">
                                <IoCalendarNumberOutline className="h-12 lg:w-8 w-12 lg:h-8" />
                                <h1 className="font-semibold text-xl mt-2">Eventos</h1>
                            </Link>
                        </nav>
                    </div>
                </div>
                <div className="flex lg:hidden items-center justify-between px-6 h-12">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center font-mono bg-green-800 text-[#FFFFFF] px-2 py-1 rounded-lg capitalize gap-2 mr-4">
                                Tabla de {selectedView} <CgArrowsExchangeAlt className="h-5 w-5" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuRadioGroup defaultValue={selectedView} className="flex flex-col px-3 text-lg font-semibold pr-4">
                                <Link href="posts" className="mt-1 font-light border-b border-slate-300 hover:bg-gray-50 w-full">Posts</Link>
                                <Link href="juegos" className="mt-1 font-light border-b border-slate-300 hover:bg-gray-50 w-full">Juegos</Link>
                                <Link href="miembros" className="mt-1 font-light border-b border-slate-300 hover:bg-gray-50 w-full">Miembros</Link>
                                <Link href="autoridades" className="mt-1 font-light border-b border-slate-300 hover:bg-gray-50 w-full">Autoridades</Link>
                                <Link href="eventos" className="font-light hover:bg-gray-50 w-full">Eventos</Link>
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
                </div>
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