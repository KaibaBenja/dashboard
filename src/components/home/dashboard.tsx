"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { TbPackage, TbFileText } from "react-icons/tb";
import { MdOutlineShield } from "react-icons/md";
import { LuGamepad, LuUsers } from "react-icons/lu";
import { IoCalendarNumberOutline } from "react-icons/io5";


import { GameTable } from "./game-table";
import { NewsTable } from "./news-table";
import { AuthorityTable } from "./authorities-table";
import { MembersTable } from "./members-table";
import { Header } from "./header";
import { EventsTable } from "./events-table";
import { useAppContext } from "@/context/AppContext";

export function Dashboard() {
    const [selectedView, setSelectedView] = useState("games");
    const { token } = useAppContext();
    console.log(token);
    // const router = useRouter();

    // useEffect(() => {
    //     if(!token) {
    //         router.push("/login")
    //     } else {
    //         router.push("/")
    //     }
    // }, [token])

    const renderTable = () => {
        switch (selectedView) {
            case "blogs":
                return <NewsTable />;
            case "games":
                return <GameTable />;
            case "members":
                return <MembersTable />;
            case "authorities":
                return <AuthorityTable />;
            case "Events":
                return <EventsTable />
            default:
                return <GameTable />;
        }
    };

    return (
        <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 lg:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                            <TbPackage className="h-6 w-6" />
                            <span className="">Admin Dashboard</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <button
                                onClick={() => setSelectedView("blogs")}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${selectedView === "blogs" ? "text-primary" : "text-muted-foreground"} hover:bg-accent hover:text-accent-foreground`}
                            >
                                <TbFileText className="h-4 w-4" />
                                Blogs
                            </button>
                            <button
                                onClick={() => setSelectedView("games")}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${selectedView === "games" ? "text-primary" : "text-muted-foreground"} hover:bg-accent hover:text-accent-foreground`}
                            >
                                <LuGamepad className="h-4 w-4" />
                                Games
                            </button>
                            <button
                                onClick={() => setSelectedView("members")}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${selectedView === "members" ? "text-primary" : "text-muted-foreground"} hover:bg-accent hover:text-accent-foreground`}
                            >
                                <LuUsers className="h-4 w-4" />
                                Members
                            </button>
                            <button
                                onClick={() => setSelectedView("authorities")}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${selectedView === "authorities" ? "text-primary" : "text-muted-foreground"} hover:bg-accent hover:text-accent-foreground`}
                            >
                                <MdOutlineShield className="h-4 w-4" />
                                Authorities
                            </button>
                            <button
                                onClick={() => setSelectedView("Events")}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${selectedView === "authorities" ? "text-primary" : "text-muted-foreground"} hover:bg-accent hover:text-accent-foreground`}
                            >
                                <IoCalendarNumberOutline className="h-4 w-4" />
                                Events
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <Header />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    {renderTable()}
                </main>
            </div>
        </div>
    );
}
