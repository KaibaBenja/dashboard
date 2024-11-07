"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, mixed, ObjectSchema } from 'yup';

import { UpdateData } from "@/queries/UpdateData";
import { AddData } from "@/queries/AddData";
import { PostType } from "@/types/PostTypes";
import { FormProps } from "@/types/formProps";

import { FileUpload } from "../table-actions/custom-inputs/file-upload";
import { inputMessageHelper } from "../handlers/input-helper";
import { Button } from "../ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "../ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface PostFormValues {
    fecha: string;
    titulo: string;
    categoria: string;
    pre_descripcion: string;
    descripcion: string;
    blog_images: File[];
}

const schema: ObjectSchema<PostFormValues> = object({
    titulo: string()
        .required("El título es requerido")
        .defined(),
    categoria: string()
        .required("La categoría es requerida")
        .defined(),
    fecha: string()
        .required("La fecha es requerida")
        .defined(),
    pre_descripcion: string()
        .required("La pre descripción es requerida")
        .defined(),
    descripcion: string()
        .required("La descripción es requerida")
        .defined(),
    blog_images: mixed<File[]>()
        .required("Se debe ingresar al menos una imagen")
        .test('is-valid-type', 'El archivo de imagen debe ser un tipo válido', value =>
            Array.isArray(value) && value.every(file => file instanceof File)
        )
        .defined(),
});

export function PostForm({ updateID, formAction, formData, onSubmitSuccess, handleCloseSheet }: FormProps<PostType>) {
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<PostFormValues>({
        defaultValues: {
            titulo: formAction ? formData?.titulo : "",
            categoria: formAction ? formData?.categoria : "",
            fecha: formAction ? formData?.fecha : "",
            pre_descripcion: formAction ? formData?.pre_descripcion : "",
            descripcion: formAction ? formData?.descripcion : "",
            blog_images: [],
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const { toast } = useToast();
    const [fileUrls, setFileUrls] = useState<string[]>([]);

    const handleFilesSelected = (files: File[]) => {
        if (files.length > 0) {
            const newFileURLs = files.map((file) => URL.createObjectURL(file));
            setFileUrls(newFileURLs);
            setValue("blog_images", files, { shouldValidate: true, shouldTouch: true });
        }
    };

    const handleImageRemoved = () => {
        setFileUrls([]);
        setValue("blog_images", [], { shouldValidate: true });
    };

    const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
        try {
            const formData = new FormData();
            formData.append("titulo", data.titulo);
            formData.append("categoria", data.categoria);
            formData.append("fecha", data.fecha);
            formData.append("pre_descripcion", data.pre_descripcion);
            formData.append("descripcion", data.descripcion);

            data.blog_images.forEach((file) => {
                formData.append("blog_images", file);
            });

            if (formAction && updateID) {
                await UpdateData({ path: "posts", data: formData }, updateID);
            } else {
                await AddData({ path: "posts", data: formData });
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
        return formAction ? (isSubmitting ? "Editando Post" : "Editar Post") : (isSubmitting ? "Agregando Post" : "Agregar Post");
    }

    console.log(fileUrls);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="mb-4">
                <label className="block text-gray-700">
                    Título <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("titulo")}
                    type="text"
                    placeholder="titulo de la noticia"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("", errors?.titulo?.message!, errors?.titulo!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Categoria <span className="font-bold text-red-800">*</span>
                </label>
                <Select
                    value={watch("categoria")}
                    onValueChange={(value) => setValue("categoria", value, { shouldValidate: true })}
                    disabled={isSubmitting}
                >
                    <SelectTrigger className="w-full px-2 py-2 border rounded-lg focus:outline-green-800">
                        <SelectValue placeholder="¿Qué Tipo de Noticia es?" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Eventos">Eventos</SelectItem>
                        <SelectItem value="Tecnología">Tecnología</SelectItem>
                        <SelectItem value="SuSTI">SuSTI</SelectItem>
                    </SelectContent>
                </Select>
                {inputMessageHelper("", errors?.categoria?.message!, errors?.categoria!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Fecha <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("fecha")}
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("Formato de la Fecha: DD/MM/YYYY", errors?.fecha?.message!, errors?.fecha!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Pre Descripción <span className="font-bold text-red-800">*</span>
                </label>
                <textarea
                    {...register("pre_descripcion")}
                    rows={4}
                    placeholder="Pie de la noticia"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("", errors?.pre_descripcion?.message!, errors?.pre_descripcion!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Descripción <span className="font-bold text-red-800">*</span>
                </label>
                <textarea
                    {...register("descripcion")}
                    rows={4}
                    placeholder="Noticia completa"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("", errors?.descripcion?.message!, errors?.descripcion!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Imagen de Portada <span className="font-bold text-red-800">*</span>
                </label>
                <FileUpload
                    files={fileUrls}
                    onFilesSelected={handleFilesSelected}
                    onFileRemoved={handleImageRemoved}
                    limit={4}
                />
                {/* {inputMessageHelper("", errors?.blog_images?.message!, errors?.blog_images!)} */}
            </div>
            <div className="col-span-2 flex justify-end">
                <Button type="submit" className="mr-2 bg-green-800 w-full" disabled={isSubmitting}>
                    {isSubmitting && <AiOutlineLoading3Quarters className="animate-spin mr-2 text-lg" />}
                    {handleLoadingText()}
                </Button>
            </div>
        </form>
    );
}