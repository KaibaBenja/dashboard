import { StaticImageData } from "next/image";

export interface AuthorityType {
    _id: string;
    name: string;
    puesto: string;
    profile_pic: string | string[];
}