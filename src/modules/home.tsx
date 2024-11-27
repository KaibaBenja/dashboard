"use client";

import { useEffect, useState } from "react";
import { parseCookies } from "nookies";

import { UserInfo } from "@/types/UserInfo";

import { SectionViews } from "../components/home/section-views";
import { Info } from "../components/home/info";

export function Home() {
    const cookies = parseCookies();
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
        <div className="flex flex-col justify-center mb-14">
            <h1 className="font-semibold text-4xl text-[#66cc00]">
                Tablero dinamico del Gamecenter
            </h1>
            <div className="flex flex-col flex-wrap gap-8 mt-8">
                <SectionViews
                    userRole={userInfo?.role}
                />
                <Info />
            </div>
        </div>
    )
}