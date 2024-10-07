"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, array, mixed, ObjectSchema } from 'yup';
import { useState } from "react";
import { UpdateData } from "@/queries/UpdateData";
import { AddData } from "@/queries/AddData";
import { PostType } from "@/types/PostTypes";
import { FormProps } from "@/types/formProps";

import { Button } from "../ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "../ui/use-toast";
import { FileUpload } from "../table-actions/custom-inputs/file-upload";
import { StaticImageData } from "next/image";

interface PostFormValues {
    fecha: string;
    titulo: string;
    categoria: string;
    pre_descripcion: string;
    descripcion: string;
    blog_images: string | File | StaticImageData;
}

const schema: ObjectSchema<PostFormValues> = object({
    titulo: string()
        .required("El título es requerido")
        .defined(),
    fecha: string()
        .required("La fecha es requerida")
        .defined(),
    categoria: string()
        .required("La categoría es requerida")
        .defined(),
    pre_descripcion: string()
        .required("La pre descripción es requerida")
        .defined(),
    descripcion: string()
        .required("La descripción es requerida")
        .defined(),
    blog_images: mixed<string | File | StaticImageData>()
        .required("Se debe ingresar una foto de perfil")
        .test('is-valid-type', 'El archivo de imagen debe ser un tipo válido', value =>
            typeof value === 'string' || value instanceof File || (value && typeof value === 'object')
        )
        .defined(),
});

export function PostForm({ updateID, formAction, formData, onSubmitSuccess, handleCloseSheet }: FormProps<PostType>) {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<PostFormValues>({
        defaultValues: {
            titulo: formAction ? formData?.titulo : "",
            fecha: formAction ? formData?.fecha : "",
            categoria: formAction ? formData?.categoria : "",
            pre_descripcion: formAction ? formData?.pre_descripcion : "",
            descripcion: formAction ? formData?.descripcion : "",
            blog_images: formAction ? formData?.blog_images : "",
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const { toast } = useToast();
    console.log(formData?.blog_images);

    const [selectedFiles, setSelectedFiles] = useState<any>([]);

    const handleImagesSelected = (files: File[]) => {
        setSelectedFiles(files);
        setValue("blog_images", files[0], { shouldValidate: true });
        console.log(files);
    };

    const handleImageRemoved = () => {
        setSelectedFiles([]);
        setValue("blog_images", "", { shouldValidate: true });
    };

    const onSubmit: SubmitHandler<PostFormValues> = async (data: any) => {
        try {
            const formData = new FormData();
            formData.append("titulo", data.titulo);
            formData.append("fecha", data.fecha);
            formData.append("categoria", data.categoria);
            formData.append("pre_descripcion", data.pre_descripcion);
            formData.append("descripcion", data.descripcion);
            formData.append("blog_images", selectedFiles[0]); // Add the first selected file

            if (formAction && formData) {
                await UpdateData({ path: "posts", data: formData }, updateID!);
                console.log("Edit");
            } else {
                await AddData({ path: "posts", data: formData });
                console.log("Add");
            }

            onSubmitSuccess();
            handleCloseSheet();
            toast({
                variant: "success",
                title: `Éxito!`,
                description: `El Post ${data?.titulo} fue ${formAction ? "editado" : "agregado"}`,
            });
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Ocurrió un Error!",
                description: "Fallo algo durante el proceso, pruebe de nuevo",
            });
        }
    };

    function handleLoadingText() {
        if (formAction) {
            return isSubmitting ? "Editando Post" : "Editar Post";
        } else {
            return isSubmitting ? "Agregando Post" : "Agregar Post";
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="mb-4">
                <label className="block text-gray-700">Título:</label>
                <input
                    {...register("titulo")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors.titulo && <p className="text-red-700 p-2 font-semibold">{errors.titulo.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Fecha:</label>
                <input
                    {...register("fecha")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors.fecha && <p className="text-red-700 p-2 font-semibold">{errors.fecha.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Categoria:</label>
                <input
                    {...register("categoria")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors.categoria && <p className="text-red-700 p-2 font-semibold">{errors.categoria.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Pre Descripción:</label>
                <textarea
                    {...register("pre_descripcion")}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors.pre_descripcion && <p className="text-red-700 p-2 font-semibold">{errors.pre_descripcion.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Descripción:</label>
                <textarea
                    {...register("descripcion")}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors.descripcion && <p className="text-red-700 p-2 font-semibold">{errors.descripcion.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Imagen de Portada:</label>
                <FileUpload
                    files={selectedFiles}
                    onFilesSelected={handleImagesSelected}
                    onFileRemoved={handleImageRemoved}
                    limit={4}
                />
                {errors.blog_images && <p className="text-red-700 p-2 font-semibold">{errors.blog_images.message}</p>}
            </div>
            <div className="col-span-2 flex justify-end">
                <Button type="submit" className="mr-2 bg-green-800 w-full" disabled={isSubmitting}>
                    {isSubmitting && <AiOutlineLoading3Quarters className="animate-spin mr-2 text-[#FFFFFF]" />}
                    {handleLoadingText()}
                </Button>
            </div>
        </form>
    );
}