"use client";

import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { usePathname } from "next/navigation";

import { Header } from "./header";
import { Navigation } from "./nav-list";
import { MobileNavigation } from "./nav-list-mobile";

import cx from "classnames";

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
    const [selectedView, setSelectedView] = useState<string>("Gamecenter Dashboard");
    const isHomeView = Boolean(pathname === "/");

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
        <div
            id="header"
            className={cx({
                "min-h-screen w-full": isHomeView,
                "grid lg:min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]": !isHomeView,
            })}
        >
            <div className="border-r bg-muted/40 lg:block">
                {!isHomeView && (<Navigation userRole={`${userInfo?.role}`} />)}
                <MobileNavigation
                    user={userInfo}
                    selectedRoute={selectedView}
                    isHomeView={isHomeView}
                    logout={logout}
                />
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