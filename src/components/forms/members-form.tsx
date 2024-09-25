"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateData } from "@/queries/UpdateData";
import { AddData } from "@/queries/AddData";
import { object, string, ObjectSchema, mixed } from 'yup';
import { MemberType } from "@/types/MemberTypes";
import { FormProps } from "@/types/formProps";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";
import { StaticImageData } from "next/image";

import { FileUpload } from "../table-actions/custom-inputs/file-upload";

interface FormValues {
    name_surname: string;
    puesto: string;
    linkedIn: string;
    profile_pic: string | File | StaticImageData;
}

const schema: ObjectSchema<FormValues> = object({
    name_surname: string()
        .required("El nombre es requerido")
        .test('is-string', 'El nombre debe ser una cadena de texto', value => typeof value === 'string')
        .defined(),
    puesto: string()
        .required("El puesto es requerido")
        .test('is-string', 'El puesto debe ser una cadena de texto', value => typeof value === 'string')
        .defined(),
    linkedIn: string()
        .required("Se debe ingresar un link valido de LinkedIn")
        .test('is-string', 'El link de LinkedIn debe ser una cadena de texto', value => typeof value === 'string'),
    profile_pic: mixed<string | File | StaticImageData>()
        .required("Se debe ingresar una foto de perfil")
        .test('is-valid-type', 'El archivo de imagen debe ser un tipo válido', value => 
            typeof value === 'string' || value instanceof File || (value && typeof value === 'object')
        )
        .defined(),
});


export function MemberForm({ formAction, formData, onSubmitSuccess, handleCloseSheet }: FormProps<MemberType>) {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({
        defaultValues: {
            name_surname: formAction ? formData?.name_surname : "",
            puesto: formAction ? formData?.puesto : "",
            linkedIn: formAction ? formData?.linkedIn : "",
            profile_pic: formAction ? formData?.profile_pic : "",
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const { toast } = useToast();

    const [fileURLs, setFileURLs] = useState<any>([]);

    const handleFilesSelected = (files: File[]) => {
        if (files.length > 0) {
            const newFileURLs = files.map((file) => URL.createObjectURL(file));
            setFileURLs(newFileURLs);
            // Set the first file in the array
            setValue("profile_pic", files[0], { shouldValidate: true, shouldTouch: true });
        }
    };    

    const handleFileRemoved = () => {
        setFileURLs([]);
        setValue("profile_pic", "", { shouldValidate: true });
    };

    const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
        try {
            const formData = new FormData();
            formData.append("name_surname", data.name_surname);
            formData.append("puesto", data.puesto);
            formData.append("linkedIn", data.linkedIn);
            
            // Check if `profile_pic` is actually a File before appending
            if (data.profile_pic instanceof File) {
                formData.append("profile_pic", data.profile_pic);
            }
    
            if (formAction) {
                await UpdateData({ path: "members", data: formData }, data._id);
                console.log("Edit");
            } else {
                await AddData({ path: "members", data: formData });
                console.log("Add");
            }
    
            onSubmitSuccess();
            handleCloseSheet();
            toast({
                variant: "success",
                title: `Éxito!`,
                description: `El miembro ${data.name_surname} fue ${formAction ? "editado" : "agregado"}`,
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
        if (formAction) {
            return isSubmitting ? "Editando Miembro" : "Editar Miembro";
        } else {
            return isSubmitting ? "Agregando Miembro" : "Agregar Miembro";
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="mb-4">
                <label className="block text-gray-700">Nombre:</label>
                <input
                    {...register("name_surname")}
                    type="text"
                    placeholder="Nombre"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.name_surname && <p className="text-red-700 p-2 font-semibold">{errors.name_surname.message}</p>}
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
                <label className="block text-gray-700">LinkedIn:</label>
                <input
                    {...register("linkedIn")}
                    type="text"
                    placeholder="LinkedIn"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.linkedIn && <p className="text-red-700 p-2 font-semibold">{errors.linkedIn.message}</p>}
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