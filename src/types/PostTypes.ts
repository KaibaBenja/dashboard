import { StaticImageData } from "next/image";

export interface PostType {
    _id: string;
    titulo: string;
    fecha: string;
    categoria: string;
    pre_descripcion: string;
    descripcion: string;
    blog_images: string | StaticImageData;
}