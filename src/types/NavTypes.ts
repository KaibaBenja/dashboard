import { IconType } from "react-icons";
import { UserInfo } from "./UserInfo";

export interface NavigationProps {
    user?: UserInfo;
    views?: ViewsTypes[];
    userRole?: string;
    selectedRoute?: string;
    logout?: () => void;
}

export type ViewsTypes = {
    name: string;
    icon?: IconType;
}