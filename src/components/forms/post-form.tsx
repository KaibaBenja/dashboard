"use client";

import { useState } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, mixed, ObjectSchema, array } from "yup";

import { UpdateData } from "@/queries/UpdateData";
import { AddData } from "@/queries/AddData";
import { PostType } from "@/types/PostTypes";
import { FormProps } from "@/types/formProps";

import { FileUpload } from "../table-actions/custom-inputs/file-upload";
import { inputMessageHelper } from "../handlers/input-helper";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { MultiInput } from "../table-actions/custom-inputs/multi-inputs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
        .required("El título de la noticia es obligatorio.")
        .defined(),
    categoria: string().required("Debes seleccionar una categoría.").defined(),
    fecha: string()
        .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Formato inválido. Use DD/MM/YYYY.")
        .required("La fecha del evento es obligatoria.")
        .defined(),
    pie_noticia: string()
        .required("El pie de la noticia es obligatorio.")
        .defined(),
    parrafos_noticia: mixed<string[]>()
        .required("Debes agregar al menos un párrafo.")
        .defined(),
    blog_images: array()
        .of(
            mixed<File>()
                .required("Debes subir una imagen")
                .test(
                    "is-valid-file",
                    "El archivo debe ser una imagen válida (JPEG, JPG, PNG)",
                    (file) =>
                        file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
                )
                .test(
                    "is-valid-size",
                    "El archivo no debe superar los 3MB",
                    (file) => file && file.size <= 3 * 1024 * 1024
                )
                .test(
                    "is-valid-name",
                    "El archivo no debe contener caracteres especiales en el nombre",
                    (file) => file && /^[a-zA-Z0-9.]+$/.test(file.name)
                )
        )
        .min(1, "Debes subir al menos una imagen")
        .required("Este campo es obligatorio"),
});

export function PostForm({
    updateID,
    formAction,
    formData,
    onSubmitSuccess,
    handleCloseSheet,
}: FormProps<PostType>) {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<PostFormValues>({
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
    const [fileUrls, setFileUrls] = useState<any[]>([]);
    const [fecha, setFecha] = useState<string>("");
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
        setFileUrls((prevFiles: any) =>
            prevFiles.filter((_: any, i: number) => i !== index)
        );
        setValue(
            "blog_images",
            fileUrls.filter((_: any, i: number) => i !== index),
            {
                shouldValidate: true,
                shouldTouch: true,
            }
        );
    };

    const formatFecha = (value: string) => {
        const numeros = value.replace(/\D/g, "");

        const day = numeros.substring(0, 2);
        const month = numeros.substring(2, 4);
        const year = numeros.substring(4, 8);

        let formatted = day;
        if (month) formatted += `/${month}`;
        if (year) formatted += `/${year}`;

        return formatted;
    };

    const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const formattedValue = formatFecha(value);
        const [dd, mm] = formattedValue.split("/").map(Number);

        if (dd > 31 || mm > 12) {
            return;
        }

        setFecha(formattedValue);
    };

    const onSubmit: SubmitHandler<PostFormValues> = async (
        data: PostFormValues
    ) => {
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
                description: `El Post ${data?.titulo} fue ${formAction ? "editado" : "agregado"
                    }`,
            });
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Ocurrió un Error!",
                description: `Fallo algo durante el proceso, pruebe de nuevo (${error})`,
            });
        }
    };

    function handleLoadingText() {
        if (formAction) {
            return isSubmitting ? "Editando Post..." : "Editar Post";
        } else {
            return isSubmitting ? "Agregando Post..." : "Agregar Post";
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="mb-4">
                <label className="block text-gray-700">
                    Título de la Noticia <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("titulo")}
                    type="text"
                    placeholder="Ejemplo: Innovación Tecnológica 2024"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Escribe el título principal de la noticia.",
                    errors?.titulo?.message!,
                    errors?.titulo!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Categoría <span className="font-bold text-red-800">*</span>
                </label>
                <Select
                    value={watch("categoria")}
                    onValueChange={(value) =>
                        setValue("categoria", value, { shouldValidate: true })
                    }
                    disabled={isSubmitting}
                >
                    <SelectTrigger className="w-full px-2 py-2 border rounded-lg focus:outline-green-800">
                        <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Eventos">Eventos</SelectItem>
                        <SelectItem value="Tecnología">Tecnología</SelectItem>
                        <SelectItem value="Institucional">Institucional</SelectItem>
                    </SelectContent>
                </Select>
                {inputMessageHelper(
                    "Elige la categoría que mejor describa la noticia.",
                    errors?.categoria?.message!,
                    errors?.categoria!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Fecha de la Publicación{" "}
                    <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("fecha")}
                    type="text"
                    placeholder="Ej: 25/12/2024"
                    value={fecha}
                    onChange={handleFechaChange}
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Formato requerido: DD/MM/YYYY.",
                    errors?.fecha?.message!,
                    errors?.fecha!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Pie de Noticia <span className="font-bold text-red-800">*</span>
                </label>
                <textarea
                    {...register("pie_noticia")}
                    rows={4}
                    placeholder="Resumen breve de la noticia (máximo 2-3 líneas)."
                    className="w-full px-2 py-2 border rounded-lg resize-none focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Proporciona un resumen o introducción breve de la noticia.",
                    errors?.pie_noticia?.message!,
                    errors?.pie_noticia!
                )}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Párrafos de la Noticia:"
                    values={parrafos_noticia}
                    onChange={(val) => handleArrayChange("parrafos_noticia", val)}
                />
                {inputMessageHelper(
                    <div className="flex flex-col gap-2 mt-2">
                        ESPECIFICACIONES:
                        <p>
                            1. Añade los párrafos completos que desarrollan la noticia.
                            <br />
                        </p>
                        <p>
                            {formAction &&
                                "2. En caso de querer editar el contenido de los párrafos se deben volver a ingresar los parrafos que se quieran mantener y las nuevas (manteniendo el mismo orden), sino dejar vacio este input en el formulario de edición"}
                        </p>
                    </div>,
                    errors?.parrafos_noticia?.message!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Imágenes de la Noticia{" "}
                    <span className="font-bold text-red-800">*</span>
                </label>
                <FileUpload
                    files={fileUrls}
                    onFilesSelected={handleImageSelected}
                    onFileRemoved={handleImageRemoved}
                    limit={4}
                />
                {inputMessageHelper(
                    <div className="flex flex-col gap-2 mt-2">
                        ESPECIFICACIONES:
                        <p>
                            1. Las imágenes no contener nombres con caracteres especiales (* -
                            _ / | # { } + = @ ¿ ? : % ! ¡). <br />
                        </p>
                        <p>
                            2. Ingresar solo Archivos de imágenes (JPG, JPEG, PNG). <br />
                        </p>
                        <p>
                            3. Imágenes no Mayores a 3MB. <br />
                        </p>
                        <p>
                            4. DIMENSIONES IMÁGENES: HORIZONTAL TAMAÑO MEDIANO (ANCHO 1125PX ALTURA 750PX) <br />
                        </p>
                        <p>
                            {formAction &&
                                "5. En caso de editar se deben volver a ingresar las imágenes que se quieran mantener y las nuevas (o solamente las nuevas)"}
                        </p>
                    </div>,
                    errors?.blog_images?.message!,
                    errors?.blog_images
                )}
            </div>
            <div className="col-span-2 flex justify-end">
                <Button
                    type="submit"
                    className="mr-2 bg-green-800 w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting && (
                        <AiOutlineLoading3Quarters className="animate-spin mr-2 text-lg" />
                    )}
                    {handleLoadingText()}
                </Button>
            </div>
        </form>
    );
}
