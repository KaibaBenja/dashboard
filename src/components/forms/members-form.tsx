import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ObjectSchema, mixed } from "yup";

import { UpdateData } from "@/queries/UpdateData";
import { AddData } from "@/queries/AddData";
import { MemberType } from "@/types/MemberTypes";
import { FormProps } from "@/types/formProps";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";
import { FileUpload } from "../table-actions/custom-inputs/file-upload";
import { inputMessageHelper } from "../handlers/input-helper";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface MemberFormValues {
    name_surname: string;
    team: string;
    puesto: string;
    linkedIn: string;
    profile_pic: string | File;
}

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const FILE_NAME_PATTERN = /^[a-zA-Z0-9.\-_\s]+$/;

const schema: ObjectSchema<MemberFormValues> = object({
    name_surname: string()
        .required("El nombre es requerido")
        .test(
            "is-string",
            "El nombre debe ser una cadena de texto",
            (value) => typeof value === "string"
        )
        .defined(),
    team: string().required("El Team es requerido").defined(),
    puesto: string()
        .required("El puesto es requerido")
        .test(
            "is-string",
            "El puesto debe ser una cadena de texto",
            (value) => typeof value === "string"
        )
        .defined(),
    linkedIn: string()
        .required("Se debe ingresar un link valido de LinkedIn")
        .test(
            "is-valid-link",
            "El link debe empezar con https://www.linkedin.com/in/ o ser null",
            (value) =>
                value === "null" ||
                (typeof value === "string" &&
                    value.startsWith("https://www.linkedin.com/in/"))
        ),
    profile_pic: mixed<string | File>()
        .required("Se debe ingresar una foto de perfil")
        .test(
            "is-valid-type",
            "El archivo debe ser una imagen válida (JPEG, JPG o PNG)",
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
        .test("is-valid-size", "El archivo no debe superar los 3MB", (value) => {
            if (value instanceof File) {
                return value.size <= MAX_FILE_SIZE;
            }
            return true;
        })
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

export function MemberForm({
    updateID,
    formAction,
    formData,
    onSubmitSuccess,
    handleCloseSheet,
}: FormProps<MemberType>) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<MemberFormValues>({
        defaultValues: {
            name_surname: formAction ? formData?.name_surname : "",
            team: formAction ? formData?.team : "",
            puesto: formAction ? formData?.puesto : "",
            linkedIn: formAction
                ? formData?.linkedIn === "no_profile_existence"
                    ? "null"
                    : formData?.linkedIn
                : "",
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

    const onSubmit: SubmitHandler<MemberFormValues> = async (
        data: MemberFormValues
    ) => {
        try {
            const formData = new FormData();
            formData.append("name_surname", data.name_surname);
            formData.append("team", data.team);
            formData.append("puesto", data.puesto);
            formData.append(
                "linkedIn",
                data.linkedIn !== "null" ? data.linkedIn : "no_profile_existence"
            );

            if (data.profile_pic instanceof File) {
                formData.append("profile_pic", data.profile_pic);
            }

            if (fileURLs?.length === 1) {
                if (formAction) {
                    await UpdateData({ path: "members", data: formData }, updateID!);
                } else {
                    await AddData({ path: "members", data: formData });
                }
            }

            onSubmitSuccess();
            handleCloseSheet();
            toast({
                variant: "success",
                title: `Éxito!`,
                description: `El miembro ${data.name_surname} fue ${formAction ? "editado" : "agregado"
                    }`,
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
            return isSubmitting ? "Editando Miembro..." : "Editar Miembro";
        } else {
            return isSubmitting ? "Agregando Miembro..." : "Agregar Miembro";
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="mb-4">
                <label className="block text-gray-700">
                    Nombre y Apellido <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("name_surname")}
                    type="text"
                    placeholder="Escribe tu nombre y apellido completo"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Ingresa tu nombre completo",
                    errors?.name_surname?.message!,
                    errors?.name_surname!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Equipo <span className="font-bold text-red-800">*</span>
                </label>
                <Select
                    onValueChange={(value) =>
                        setValue("team", value, { shouldValidate: true })
                    }
                    value={watch("team")}
                    disabled={isSubmitting}
                >
                    <SelectTrigger className="w-full px-2 py-2 border rounded-lg focus:outline-green-800">
                        <SelectValue placeholder="Selecciona el equipo al que perteneces" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Desarrolladores">Desarrolladores</SelectItem>
                        <SelectItem value="Comunicación">Comunicación</SelectItem>
                        <SelectItem value="Diseño">Diseño</SelectItem>
                        <SelectItem value="Impresiones 3D">Impresiones 3D</SelectItem>
                        <SelectItem value="Logística y Soporte">
                            Logística y Soporte
                        </SelectItem>
                    </SelectContent>
                </Select>
                {inputMessageHelper(
                    "Selecciona un equipo del listado",
                    errors?.team?.message!,
                    errors?.team!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Puesto <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("puesto")}
                    type="text"
                    placeholder="Escribe el puesto que ocupas"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Por ejemplo: Desarrollador Frontend",
                    errors?.puesto?.message!,
                    errors?.puesto!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    LinkedIn <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("linkedIn")}
                    type="text"
                    placeholder="Enlace al perfil de LinkedIn"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Ingresa la URL completa del perfil de LinkedIn",
                    errors?.linkedIn?.message!,
                    errors?.linkedIn!
                )}
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
                            1. Las imagen no debe contener nombres con caracteres especiales (* -
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
