"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateData } from "@/queries/UpdateData";
import { AddData } from "@/queries/AddData";
import { object, string, mixed, ObjectSchema } from "yup";
import { AuthorityType } from "@/types/AuthTypes";
import { FormProps } from "@/types/formProps";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";

import { FileUpload } from "../table-actions/custom-inputs/file-upload";
import { StaticImageData } from "next/image";

interface FormValues {
    name: string;
    puesto: string;
    profile_pic: string | string[] | File | StaticImageData;
}

const schema: ObjectSchema<FormValues> = object({
    name: string()
        .required("El nombre es requerido")
        .test('is-string', 'El nombre debe ser una cadena de texto', value => typeof value === 'string')
        .defined(),
    puesto: string()
        .required("El puesto es requerido")
        .test('is-string', 'El puesto debe ser una cadena de texto', value => typeof value === 'string')
        .defined(),
        profile_pic: mixed<string | File | StaticImageData>()
        .required("Se debe ingresar una foto de perfil")
        .test('is-valid-type', 'El archivo de imagen debe ser un tipo válido', value => 
            typeof value === 'string' || value instanceof File || (value && typeof value === 'object')
        )
        .defined(),
});

export function AuthorityForm({ updateID, formAction, formData, onSubmitSuccess, handleCloseSheet }: FormProps<AuthorityType>) {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({
        defaultValues: {
            name: formAction ? formData?.name : "",
            puesto: formAction ? formData?.puesto : "",
            profile_pic: formAction ? formData?.profile_pic : "",
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const { toast } = useToast();
    const [fileURLs, setFileURLs] = useState<string[]>([]);

    const handleFilesSelected = (files: File[]) => {
        if (files.length > 0) {
            const newFileURLs = files.map((file) => URL.createObjectURL(file));
            setFileURLs(newFileURLs);
            setValue("profile_pic", files[0], { shouldValidate: true, shouldTouch: true });
        }
    };

    const handleFileRemoved = () => {
        setFileURLs([]);
        setValue("profile_pic", "", { shouldValidate: true });
    };

    const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("puesto", data.puesto);

            if (data.profile_pic instanceof File) {
                formData.append("profile_pic", data.profile_pic);
            }

            if (formAction) {
                await UpdateData({ path: "authorities", data: formData }, updateID!);
                console.log("Edit");
            } else {
                await AddData({ path: "authorities", data: formData });
                console.log("Add");
            }

            onSubmitSuccess();
            handleCloseSheet();
            toast({
                variant: "success",
                title: `Éxito!`,
                description: `La autoridad ${data.name} fue ${formAction ? "editada" : "agregada"}`,
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Ocurrió un Error!",
                description: "Fallo algo durante el proceso, pruebe de nuevo",
            });
        }
    };

    function handleLoadingText() {
        return isSubmitting ? (formAction ? "Editando Autoridad" : "Agregando Autoridad") : (formAction ? "Editar Autoridad" : "Agregar Autoridad");
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="mb-4">
                <label className="block text-gray-700">Nombre:</label>
                <input
                    {...register("name")}
                    type="text"
                    placeholder="Nombre"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.name && <p className="text-red-700 p-2 font-semibold">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Puesto:</label>
                <input
                    {...register("puesto")}
                    type="text"
                    placeholder="Puesto"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.puesto && <p className="text-red-700 p-2 font-semibold">{errors.puesto.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Foto de Perfil:</label>
                <FileUpload
                    {...register("profile_pic")}
                    files={fileURLs}
                    onFilesSelected={handleFilesSelected}
                    onFileRemoved={handleFileRemoved}
                    limit={1}
                />
                {errors?.profile_pic && <p className="text-red-700 p-2 font-semibold">{errors.profile_pic.message}</p>}
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