"use client"

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { parseCookies } from "nookies";

import { GameTable } from "./game-table";
import { NewsTable } from "./news-table";
import { AuthorityTable } from "./authorities-table";
import { MembersTable } from "./members-table";
import { Header } from "../layout/header";
import { EventsTable } from "./events-table";

import { TbFileText } from "react-icons/tb";
import { MdOutlineShield } from "react-icons/md";
import { LuGamepad, LuUsers } from "react-icons/lu";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { Button } from "../ui/button";

interface UserInfo {
    username: string;
    role: string;
    token: string
}

export function Dashboard() {
    const cookies = parseCookies();
    const { logout } = useContext(AppContext)!;
    const [selectedView, setSelectedView] = useState("Juegos");
    const [userInfo, setUserInfo] = useState<UserInfo>({ username: '', role: '', token: '' });


    useEffect(() => {
        const userInfo: UserInfo = {
            username: cookies.user ? JSON.parse(cookies.user) : '',
            role: cookies.role ? JSON.parse(cookies.role) : '',
            token: cookies.token || ''
        };
        setUserInfo(userInfo);
    }, []);

    console.log(userInfo.username, userInfo.role, userInfo.token);

    const renderTable = () => {
        switch (selectedView) {
            case "Posts":
                return <NewsTable />;
            case "Juegos":
                return <GameTable />;
            case "Miembros":
                return <MembersTable />;
            case "Autoridades":
                return <AuthorityTable />;
            case "Eventos":
                return <EventsTable />
            default:
                return <GameTable />;
        }
    };

    return (
        <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 lg:block">
                <div className="flex bg-[#66cc00] h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[80px] items-center text-[#FFFFFF] border-b px-6">
                        <Link href="#" className="flex items-center gap-2 font-semibold">
                            <span className="font-mono text-2xl font-bold text-center">GameCenter Dashboard</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start gap-6 px-4 text-sm font-medium">
                            <div className="flex flex-col items-center text-[#FFFFFF] hover:cursor-pointer hover:bg-green-800 hover:bg-opacity-30  py-3 rounded-2xl" onClick={() => setSelectedView("Posts")}>
                                <TbFileText className="h-12 w-12" />
                                <h1 className="font-semibold text-xl">Posts</h1>
                            </div>
                            <div className="flex flex-col items-center text-[#FFFFFF] hover:cursor-pointer hover:bg-green-800 hover:bg-opacity-30 py-3 rounded-2xl" onClick={() => setSelectedView("Juegos")}>
                                <LuGamepad className="h-12 w-12" />
                                <h1 className="font-semibold text-xl">Juegos</h1>
                            </div>
                            <div className="flex flex-col items-center text-[#FFFFFF] hover:cursor-pointer hover:bg-green-800 hover:bg-opacity-30 py-3 rounded-2xl" onClick={() => setSelectedView("Miembros")}>
                                <LuUsers className="h-12 w-12" />
                                <h1 className="font-semibold text-xl">Miembros</h1>
                            </div>
                            <div className="flex flex-col items-center text-[#FFFFFF] hover:cursor-pointer hover:bg-green-800 hover:bg-opacity-30 py-3 rounded-2xl" onClick={() => setSelectedView("Autoridades")}>
                                <MdOutlineShield className="h-12 w-12" />
                                <h1 className="font-semibold text-xl">Autoridades</h1>
                            </div>
                            <div className="flex flex-col items-center text-[#FFFFFF] hover:cursor-pointer hover:bg-green-800 hover:bg-opacity-30 py-3 rounded-2xl" onClick={() => setSelectedView("Eventos")}>
                                <IoCalendarNumberOutline className="h-10 w-10" />
                                <h1 className="font-semibold text-xl mt-2">Eventos</h1>
                            </div>
                        </nav>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 text-[#FFFFFF] bg-green-800 h-[200px]">
                        <FaCircleUser className="w-12 h-12" />
                        <div>
                            <h1>Usuario: <span className="capitalize text-lg">{userInfo.username}</span></h1>
                            <h1>Rol: <span className="capitalize text-lg">{userInfo.role}</span></h1>
                        </div>
                        <Button
                            onClick={logout}
                            className="bg-green-900"
                        >
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <Header section={`${selectedView}`} />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    {renderTable()}
                </main>
            </div>
        </div>
    );
}
