"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { UpdateData } from "@/queries/UpdateData";
import { AddData } from "@/queries/AddData";
import { object, string, mixed, ObjectSchema, number } from "yup";
import { AuthorityType } from "@/types/AuthTypes";
import { FormProps } from "@/types/formProps";

import { FileUpload } from "../table-actions/custom-inputs/file-upload";
import { useToast } from "@/components/ui/use-toast";
import { inputMessageHelper } from "../handlers/input-helper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface AuthorityFormValues {
    name: string;
    puesto: string;
    jerarquia: number;
    profile_pic: string | File;
}

const FILE_NAME_PATTERN = /^[a-zA-Z0-9.\-_\s]+$/;

const schema: ObjectSchema<AuthorityFormValues> = object({
    name: string()
        .required("El nombre es obligatorio.")
        .test(
            "is-string",
            "El nombre debe ser una cadena de texto.",
            (value) => typeof value === "string"
        )
        .defined(),
    puesto: string()
        .required("El puesto es obligatorio.")
        .test(
            "is-string",
            "El puesto debe ser una cadena de texto.",
            (value) => typeof value === "string"
        )
        .defined(),
    jerarquia: number()
        .required("El puesto es obligatorio.")
        .defined(),
    profile_pic: mixed<string | File>()
        .required("Se debe ingresar una foto de perfil")
        .test(
            "is-valid-name",
            "El nombre del archivo contiene caracteres no permitidos. Solo se permiten letras, números, guiones, guiones bajos, espacios y puntos.",
            (value) => {
                if (value instanceof File) {
                    return FILE_NAME_PATTERN.test(value.name);
                }
                return true;
            }
        )
        .defined(),
});

export function AuthorityForm({
    updateID,
    formAction,
    formData,
    onSubmitSuccess,
    handleCloseSheet,
}: FormProps<AuthorityType>) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<AuthorityFormValues>({
        defaultValues: {
            name: formAction ? formData?.name : "",
            puesto: formAction ? formData?.puesto : "",
            jerarquia: formAction ? formData?.jerarquia : 1,
            profile_pic: formAction ? formData?.profile_pic : "",
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const { toast } = useToast();
    const [fileURLs, setFileURLs] = useState<any[] | string>([]);

    const handleFilesSelected = (files: File[]) => {
        if (files.length > 0) {
            const newFileURLs = files.map((file) => URL.createObjectURL(file));
            setFileURLs(newFileURLs);
            setValue("profile_pic", files[0], {
                shouldValidate: true,
                shouldTouch: true,
            });
        }
    };

    const handleFileRemoved = () => {
        setFileURLs([]);
        setValue("profile_pic", "", { shouldValidate: true });
    };

    const onSubmit: SubmitHandler<AuthorityFormValues> = async (
        data: AuthorityFormValues
    ) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("puesto", data.puesto);
            const jerarquiaParse: number = Number(data.jerarquia);
            formData.append("jerarquia", jerarquiaParse.toString());

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
                duration: 2000
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Ocurrió un Error!",
                description: `Fallo algo durante el proceso, pruebe de nuevo (${error})`,
                duration: 2000
            });
        }
    };

    function handleLoadingText() {
        if (formAction) {
            return isSubmitting ? "Editando Autoridad..." : "Editar Autoridad";
        } else {
            return isSubmitting ? "Agregando Autoridad..." : "Agregar Autoridad";
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="mb-4">
                <label className="block text-gray-700">
                    Nombre Completo <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("name")}
                    type="text"
                    placeholder="Ingresa el nombre completo de la autoridad"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("", errors?.name?.message!, errors?.name!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Puesto <span className="font-bold text-red-800">*</span>
                </label>
                <Select
                    value={watch("puesto")}
                    onValueChange={(value) =>
                        setValue("puesto", value, { shouldValidate: true })
                    }
                    disabled={isSubmitting}
                >
                    <SelectTrigger className="w-full px-2 py-2 border rounded-lg focus:outline-green-800">
                        <SelectValue placeholder="Selecciona una Puesto" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Gobernador de la Provincia de Corrientes">Gobernador de la Provincia de Corrientes</SelectItem>
                        <SelectItem value="Ministro de Hacienda y Finanzas">Ministro de Hacienda y Finanzas</SelectItem>
                        <SelectItem value="Subsecretario de Sistemas y Tecnologías de la información">Subsecretario de Sistemas y Tecnologías de la información</SelectItem>
                    </SelectContent>
                </Select>   
                {inputMessageHelper("", errors?.puesto?.message!, errors?.puesto!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Jerarquía <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("jerarquia")}
                    type="number"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("La jerarquia va según el nivel de importancia de la autoridad y esto afecta al orden en que se muestra en la UI del gamecenter", errors?.jerarquia?.message!, errors?.jerarquia!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Foto de Perfil <span className="font-bold text-red-800">*</span>
                </label>
                <FileUpload
                    {...register("profile_pic")}
                    files={fileURLs}
                    onFilesSelected={handleFilesSelected}
                    onFileRemoved={handleFileRemoved}
                    limit={1}
                />
                {inputMessageHelper(
                    <div className="flex flex-col gap-2 mt-2">
                        ESPECIFICACIONES:
                        <p>
                            1. La imagen no debe contener nombres con caracteres especiales (* -
                            _ / | # { } + = @ ¿ ? : % ! ¡). <br />
                        </p>
                        <p>
                            2. Ingresar solo Archivos de imágenes (JPG, JPEG, PNG). <br />
                        </p>
                        <p>
                            3. Imagen no Mayores a 3MB. <br />
                        </p>
                        <p>
                            4. DIMENSION DE LA IMAGEN: CUADRADO MEDIANO (ANCHO 750 - ALTURA 750) <br />
                        </p>
                        <p>
                            {formAction &&
                                "5. En caso de editar se deben volver a ingresar la imagen que se quiera mantener o la nueva imagen"}
                        </p>
                    </div>,
                    errors?.profile_pic?.message!,
                    errors?.profile_pic!
                )}
            </div>
            <div className="col-span-2 flex justify-end">
                <Button
                    type="submit"
                    className="mr-2 bg-green-800 w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting && (
                        <AiOutlineLoading3Quarters className="animate-spin mr-2 text-[#FFFFFF]" />
                    )}
                    {handleLoadingText()}
                </Button>
            </div>
        </form>
    );
}