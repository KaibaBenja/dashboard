import { StaticImageData } from "next/image";

export interface AuthoritieType {
    _id: string;
    name: string;
    puesto: string;
    profile_pic: string[] | StaticImageData[];
}