"use client";

import { useState } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
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
import { MultiInput } from "../table-actions/custom-inputs/multi-inputs";

interface PostFormValues {
    fecha: string;
    titulo: string;
    categoria: string;
    pie_noticia: string;
    parrafos_noticia: string[];
    blog_images: (File | string)[];
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
    pie_noticia: string()
        .required("La pre descripción es requerida")
        .defined(),
    parrafos_noticia: mixed<string[]>()
        .required("La descripción es requerida")
        .defined(),
    blog_images: mixed<File[]>()
        .required("Se debe ingresar al menos una imagen")
        .defined(),
});

export function PostForm({ updateID, formAction, formData, onSubmitSuccess, handleCloseSheet }: FormProps<PostType>) {
    const { register, handleSubmit, setValue, control, watch, formState: { errors, isSubmitting } } = useForm<PostFormValues>({
        defaultValues: {
            titulo: formAction ? formData?.titulo : "",
            categoria: formAction ? formData?.categoria : "",
            fecha: formAction ? formData?.fecha : "",
            pie_noticia: formAction ? formData?.pie_noticia : "",
            parrafos_noticia: formAction ? formData?.parrafos_noticia : [],
            blog_images: formAction ? formData?.blog_images : [],
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const { toast } = useToast();
    const blog_images: string[] = formAction ? formData?.blog_images! : [];
    const [fileUrls, setFileUrls] = useState<any[]>(blog_images);
    const parrafos_noticia = useWatch({
        control,
        name: "parrafos_noticia",
        defaultValue: [],
    });

    const handleArrayChange = (
        fieldName: keyof PostFormValues,
        values: string[]
    ) => {
        setValue(fieldName, values, { shouldValidate: true });
    };

    const handleImageSelected = (files: File[]) => {
        if (files.length > 0) {
            const newFileURLs = files.map((file) => URL.createObjectURL(file));
            setFileUrls((prevFiles: any) => [...prevFiles, ...newFileURLs]);
            setValue("blog_images", files, {
                shouldValidate: true,
                shouldTouch: true,
            });
            console.log(files);
        }
    };

    const handleImageRemoved = (index: number) => {
        setFileUrls((prevFiles: any) => prevFiles.filter((_: any, i: number) => i !== index));
        setValue("blog_images", fileUrls.filter((_: any, i: number) => i !== index), {
            shouldValidate: true,
            shouldTouch: true,
        });
    };

    const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
        try {
            const formData = new FormData();
            formData.append("titulo", data.titulo);
            formData.append("categoria", data.categoria);
            formData.append("fecha", data.fecha);
            formData.append("pie_noticia", data.pie_noticia);
            data.parrafos_noticia.forEach((parrafo: string) => {
                formData.append("parrafos_noticia", parrafo);
            });

            data.blog_images.forEach((file: File | string) => {
                formData.append("blog_images", file);
            });

            if (fileUrls.length <= 4) {
                if (formAction && updateID) {
                    await UpdateData({ path: "posts", data: formData }, updateID);
                } else {
                    await AddData({ path: "posts", data: formData });
                }
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
                    {...register("pie_noticia")}
                    rows={4}

                    placeholder="Pie de la noticia"
                    className="w-full px-2 py-2 border rounded-lg resize-none focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("", errors?.pie_noticia?.message!, errors?.pie_noticia!)}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Parrafos de la Noticia:"
                    values={parrafos_noticia}
                    onChange={(val) => handleArrayChange("parrafos_noticia", val)}
                />
                {inputMessageHelper("", errors?.parrafos_noticia?.message!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Imagen de Portada <span className="font-bold text-red-800">*</span>
                </label>
                <FileUpload
                    files={fileUrls}
                    onFilesSelected={handleImageSelected}
                    onFileRemoved={handleImageRemoved}
                    limit={4}
                />
                {inputMessageHelper("Las imagenes no contener nombres con caracteres especiales (* - _ \ / | # { } + = @ ¿ ? : % ! ¡)", errors?.blog_images?.message!)}
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