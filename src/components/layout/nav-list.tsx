import Link from "next/link";

import { NavigationProps, ViewsTypes } from "@/types/NavTypes";

import { adminViews, comunicationViews, devView, impresionView } from "@/utils/roles";

function NavList({ views }: { views: ViewsTypes[] }) {
    return (
        <div className="hidden lg:flex bg-[#66cc00] h-full max-h-screen flex-col gap-2">
            <div className="flex h-[80px] items-center text-[#FFFFFF] border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <span className="font-mono text-2xl font-bold text-center">GameCenter Dashboard</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start gap-6 px-4 text-sm font-medium">
                    {views.map((data: ViewsTypes, index: number) => (
                        <Link key={index} href={`${data?.name}`} className="flex flex-col items-center text-[#FFFFFF] hover:cursor-pointer hover:bg-green-800 hover:bg-opacity-30 py-3 rounded-2xl">
                            {data.icon && <data.icon className="h-12 lg:w-8 w-12 lg:h-8" />}
                            <h1 className="capitalize font-semibold text-xl">{data?.name}</h1>
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export function Navigation({ userRole }: NavigationProps) {
    switch (userRole) {
        case "Admin":
            return <NavList views={adminViews} />;
        case "Comunicación":
            return <NavList views={comunicationViews} />;
        case "Desarrollador":
            return <NavList views={devView} />;
        case "Impresiones":
            return <NavList views={impresionView} />;
        default:
            return <NavList views={adminViews} />;
    }
}