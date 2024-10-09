import Link from "next/link";

import { IoCalendarNumberOutline } from "react-icons/io5";
import { LuGamepad, LuUsers } from "react-icons/lu";
import { MdOutlineShield } from "react-icons/md";
import { TbFileText } from "react-icons/tb";

interface NavListProps {
    userRole: string;
}

export function NavList({ userRole }: NavListProps) {
    switch (userRole) {
        case "Admin":
            return (<div className="flex-1 overflow-auto py-2">
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
            </div>)
            break;
        case "Comunicación":
            return (<div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start gap-6 px-4 text-sm font-medium">
                    <Link href="posts" className="flex flex-col items-center text-[#FFFFFF] hover:cursor-pointer hover:bg-green-800 hover:bg-opacity-30 py-3 rounded-2xl">
                        <TbFileText className="h-12 lg:w-8 w-12 lg:h-8" />
                        <h1 className="font-semibold text-xl">Posts</h1>
                    </Link>
                    <Link href="eventos" className="flex flex-col items-center text-[#FFFFFF] hover:cursor-pointer hover:bg-green-800 hover:bg-opacity-30 py-3 rounded-2xl">
                        <IoCalendarNumberOutline className="h-12 lg:w-8 w-12 lg:h-8" />
                        <h1 className="font-semibold text-xl mt-2">Eventos</h1>
                    </Link>
                </nav>
            </div>)
            break;
        case "Desarrollador":
            return (<div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start gap-6 px-4 text-sm font-medium">
                    <Link href="juegos" className="flex flex-col items-center text-[#FFFFFF] hover:cursor-pointer hover:bg-green-800 hover:bg-opacity-30 py-3 rounded-2xl">
                        <LuGamepad className="h-12 lg:w-8 w-12 lg:h-8" />
                        <h1 className="font-semibold text-xl">Juegos</h1>
                    </Link>
                </nav>
            </div>)
            break;
        default:
            return (<div className="flex-1 overflow-auto py-2">
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
            </div>)
            break;
    }
}