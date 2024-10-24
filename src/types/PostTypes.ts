import { StaticImageData } from "next/image";

export interface PostType {
    _id: string;
    titulo: string;
    categoria: string;
    fecha: string;
    pre_descripcion: string;
    descripcion: string;
    blog_images: string | File;
}