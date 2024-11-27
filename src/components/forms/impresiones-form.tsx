"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { UpdateData } from "@/queries/UpdateData";
import { AddData } from "@/queries/AddData";
import { object, string, mixed, ObjectSchema } from "yup";
import { ImpresionType } from "@/types/ImpresionTypes";
import { FormProps } from "@/types/formProps";

import { FileUpload } from "../table-actions/custom-inputs/file-upload";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { inputMessageHelper } from "../handlers/input-helper";

interface ImpresionFormValues {
    titulo: string;
    epigrafe: string;
    impresion_image: string | File;
}

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const FILE_NAME_PATTERN = /^[a-zA-Z0-9.\-_\s]+$/;

const schema: ObjectSchema<ImpresionFormValues> = object({
    titulo: string()
        .required("El titulo es obligatorio.")
        .test(
            "is-string",
            "El epigrafe debe ser una cadena de texto.",
            (value) => typeof value === "string"
        )
        .defined(),
    epigrafe: string()
        .required("El epigrafe es obligatorio.")
        .test(
            "is-string",
            "El puesto debe ser una cadena de texto.",
            (value) => typeof value === "string"
        )
        .defined(),
    impresion_image: mixed<string | File>()
        .required("Se debe ingresar una foto de perfil")
        .test(
            "is-valid-type",
            "El archivo debe ser una imagen válida (JPEG, JPG o PNG o GIF)",
            (value) => {
                if (typeof value === "string") {
                    return true;
                }
                if (value instanceof File) {
                    return ALLOWED_FILE_TYPES.includes(value.type);
                }
                return false;
            }
        )
        .test(
            "is-valid-size",
            "El archivo no debe superar los 3MB",
            (value) => {
                if (value instanceof File) {
                    return value.size <= MAX_FILE_SIZE;
                }
                return true;
            }
        )
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

export function ImpresionForm({
    updateID,
    formAction,
    formData,
    onSubmitSuccess,
    handleCloseSheet,
}: FormProps<ImpresionType>) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ImpresionFormValues>({
        defaultValues: {
            titulo: formAction ? formData?.titulo : "",
            epigrafe: formAction ? formData?.epigrafe : "",
            impresion_image: formAction ? formData?.impresion_image : "",
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
            setValue("impresion_image", files[0], {
                shouldValidate: true,
                shouldTouch: true,
            });
        }
    };

    const handleFileRemoved = () => {
        setFileURLs([]);
        setValue("impresion_image", "", { shouldValidate: true });
    };

    const onSubmit: SubmitHandler<ImpresionFormValues> = async (
        data: ImpresionFormValues
    ) => {
        try {
            const formData = new FormData();
            formData.append("titulo", data.titulo);
            formData.append("epigrafe", data.epigrafe);

            if (data.impresion_image instanceof File) {
                formData.append("impresion_image", data.impresion_image);
            }

            if (formAction) {
                await UpdateData({ path: "impresiones", data: formData }, updateID!);
                console.log("Edit");
            } else {
                await AddData({ path: "impresiones", data: formData });
                console.log("Add");
            }

            onSubmitSuccess();
            handleCloseSheet();
            toast({
                variant: "success",
                title: `Éxito!`,
                description: `La Impresión ${data.titulo} fue ${formAction ? "editada" : "agregada"
                    }`,
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Ocurrió un Error!",
                description: `Fallo algo durante el proceso, pruebe de nuevo (${error})`,
            });
        }
    };

    function handleLoadingText() {
        if (formAction) {
            return isSubmitting ? "Editando Impresión..." : "Editar Impresión";
        } else {
            return isSubmitting ? "Agregando Impresión..." : "Agregar Impresión";
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="mb-4">
                <label className="block text-gray-700">
                    Nombre de la Impresión <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("titulo")}
                    type="text"
                    placeholder="Ingresa como se llama la impresión"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("", errors?.titulo?.message!, errors?.titulo!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Epígrafe <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("epigrafe")}
                    type="text"
                    placeholder="Detalle de la impresión"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("Escriba una breve descripción de la impresión", errors?.epigrafe?.message!, errors?.epigrafe!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Foto de la Impresión <span className="font-bold text-red-800">*</span>
                </label>
                <FileUpload
                    {...register("impresion_image")}
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
                            2. Ingresar solo Archivos de imágenes (JPG, JPEG, PNG o GIF). <br />
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
                    errors?.impresion_image?.message!,
                    errors?.impresion_image!
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