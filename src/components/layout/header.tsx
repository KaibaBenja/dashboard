"use client";

import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaCircleUser } from "react-icons/fa6";

interface UserInfo {
    username: string;
    role: string;
    token: string
}

interface HeaderProps {
    section: string;
}

export function Header({ section }: HeaderProps) {
    const cookies = parseCookies();
    const { logout } = useContext(AppContext)!;
    const [userInfo, setUserInfo] = useState<UserInfo>({ username: '', role: '', token: '' });

    useEffect(() => {
        const userInfo: UserInfo = {
            username: cookies.user ? JSON.parse(cookies.user) : '',
            role: cookies.role ? JSON.parse(cookies.role) : '',
            token: cookies.token || ''
        };
        setUserInfo(userInfo);
    }, [cookies.role, cookies.token, cookies.user]);

    return (
        <header className="hidden lg:flex h-14 lg:h-[80px] bg-[#66cc00] items-center gap-4 border-b bg-muted/40 px-6">
            <div className="flex-1">
                <h1 className="font-bold font-mono text-2xl">{section}</h1>
            </div>
            {Boolean(userInfo.token) && <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center text-green-800 capitalize gap-2 mr-4">
                        {userInfo.username} <FaCircleUser className="h-7 w-7 mb-1" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-2">
                    <DropdownMenuRadioGroup value="menu">
                        <DropdownMenuRadioItem className="pr-4" value="usuario">Usuario: {userInfo.username}</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="role">Rol: {userInfo.role}</DropdownMenuRadioItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioItem className="cursor-pointer bg-green-800 text-[#FFFFFF] p-2 rounded-md flex justify-center" value="logout" onClick={logout}>Cerrar Sesión</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>}
        </header>
    )
}

