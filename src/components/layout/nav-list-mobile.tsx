import Link from "next/link";

import { CgArrowsExchangeAlt } from "react-icons/cg";
import { FaCircleUser } from "react-icons/fa6";

import { NavigationProps, ViewsTypes } from "@/types/NavTypes";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";


const adminViews: ViewsTypes[] = [
    { name: "posts"},
    { name: "juegos"},
    { name: "miembros"},
    { name: "autoridades"},
    { name: "eventos"},
];

const devView: ViewsTypes[] = [{ name: "juegos"}];

const comunicationViews: ViewsTypes[] = [
    { name: "posts"},
    { name: "eventos"},
];

function NavList({ user, views, selectedRoute, logout }: NavigationProps) {
    return (
        <div className="flex lg:hidden items-center justify-between px-6 h-12">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center font-mono bg-green-800 text-[#FFFFFF] px-2 py-1 rounded-lg capitalize gap-2">
                        {selectedRoute} <CgArrowsExchangeAlt className="h-5 w-5" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="ml-4">
                    <DropdownMenuRadioGroup defaultValue={selectedRoute} className="text-lg font-semibold">
                        {views?.map((view: ViewsTypes, index: number) => (
                            <DropdownMenuRadioItem key={index} value={view.name}>
                                <Link href={`/${view.name}`}>{view.name}</Link>
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center text-green-800 capitalize gap-2 mr-4">
                        <span className="hidden md:block">{user?.username}</span> <FaCircleUser className="h-7 w-7 mb-1" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuRadioGroup value="menu">
                        <DropdownMenuRadioItem className="pr-4" value="usuario">Usuario: {user?.username}</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="role">Rol: {user?.role}</DropdownMenuRadioItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioItem
                            className="cursor-pointer bg-green-800 text-[#FFFFFF] p-2 rounded-md flex justify-center"
                            value="logout"
                            onClick={() => logout?.()}
                        >
                            Cerrar Sesión
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export function MobileNavigation({ user, selectedRoute, logout }: NavigationProps) {
    switch (user?.role) {
        case "Admin":
            return (<NavList
                user={user}
                views={adminViews}
                selectedRoute={selectedRoute}
                logout={logout}
            />);
        case "Comunicación":
            return (<NavList
                user={user}
                views={comunicationViews}
                selectedRoute={selectedRoute}
                logout={logout}
            />);
        case "Desarrollador":
            return (<NavList
                user={user}
                views={devView}
                selectedRoute={selectedRoute}
                logout={logout}
            />);
        default:
            return (<NavList
                user={user}
                views={adminViews}
                selectedRoute={selectedRoute}
                logout={logout}
            />);
    }
}