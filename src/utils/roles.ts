import { ViewsTypes } from "@/types/NavTypes";

import { IoCalendarNumberOutline } from "react-icons/io5";
import { LuGamepad, LuUsers } from "react-icons/lu";
import { MdOutlineShield } from "react-icons/md";
import { TbFileText } from "react-icons/tb";
import { BsBadge3D } from "react-icons/bs";

export const adminViews: ViewsTypes[] = [
    { name: "posts", icon: TbFileText },
    { name: "juegos", icon: LuGamepad },
    { name: "miembros", icon: LuUsers },
    { name: "autoridades", icon: MdOutlineShield },
    { name: "eventos", icon: IoCalendarNumberOutline }
];

export const devView: ViewsTypes[] = [{ name: "juegos", icon: LuGamepad }];
export const impresionView: ViewsTypes[] = [{ name: "impresiones", icon: BsBadge3D }];

export const comunicationViews: ViewsTypes[] = [
    { name: "posts", icon: TbFileText },
    { name: "eventos", icon: IoCalendarNumberOutline },
];