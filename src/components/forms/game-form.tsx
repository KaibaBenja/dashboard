"use client";

import { useState } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, mixed, ObjectSchema, array } from "yup";

import { UpdateData } from "@/queries/UpdateData";
import { AddData } from "@/queries/AddData";
import { GameType } from "@/types/GameTypes";
import { FormProps } from "@/types/formProps";

import { FileUpload } from "../table-actions/custom-inputs/file-upload";
import { inputMessageHelper } from "../handlers/input-helper";
import { Button } from "../ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "../ui/use-toast";
import { MultiInput } from "../table-actions/custom-inputs/multi-inputs";

interface GameFormValues {
    titulo: string;
    autores: string[];
    sinopsis: string;
    aporte_turismo: string[];
    aporte_cultura: string[];
    aporte_juventud: string[];
    aporte_educacion: string[];
    objetivo: string;
    desarrollo_juego: string;
    condiciones_juego: string[];
    controles: string[];
    tecnologias: string[];
    estilo: string;
    genero: string[];
    game_window: string;
    game_images: (File | string)[];
    game_archive?: (File | string)[];
    game_questions?: (File | string)[];
    windows_ejecutable?: (File | string)[];
    android_apk?: (File | string)[];
}

const schema: ObjectSchema<GameFormValues> = object({
    titulo: string().required("El título es requerido"),
    autores: array()
        .of(string().required("Cada autor debe ser un texto"))
        .required("Debe especificar al menos un autor")
        .min(1, "Debe incluir al menos un autor"),
    sinopsis: string().required("La sinopsis es requerida"),
    aporte_turismo: array()
        .of(string().required())
        .required("El aporte al turismo es requerido")
        .min(1, "Debe incluir al menos un aporte"),
    aporte_cultura: array()
        .of(string().required())
        .required("El aporte a la cultura es requerido")
        .min(1, "Debe incluir al menos un aporte"),
    aporte_juventud: array()
        .of(string().required())
        .required("El aporte a la juventud es requerido")
        .min(1, "Debe incluir al menos un aporte"),
    aporte_educacion: array()
        .of(string().required())
        .required("El aporte a la educación es requerido")
        .min(1, "Debe incluir al menos un aporte"),
    objetivo: string().required("El objetivo es requerido"),
    desarrollo_juego: string().required("El desarrollo es requerido"),
    condiciones_juego: array()
        .of(string().required())
        .required("Se requiere al menos una condición")
        .min(1, "Se requiere al menos una condición"),
    controles: array()
        .of(string().required())
        .required("Se requiere al menos un control")
        .min(1, "Se requiere al menos un control"),
    tecnologias: array()
        .of(string().required())
        .required("Se requiere al menos una tecnología")
        .min(1, "Se requiere al menos una tecnología"),
    estilo: string().required("El estilo es requerido"),
    genero: array()
        .of(string().required("Debe especificar un género para el juego"))
        .required("Se requiere al menos un género")
        .min(1, "Se requiere al menos un género"),
    game_window: string().required(
        "Se requiere colocar la direccion del juego (Horizontal/Vertical)"
    ),
    game_images: array()
        .of(
            mixed<File>()
                .required("Debes subir una imagen")
                .test(
                    "is-valid-file",
                    "El archivo debe ser una imagen válida (JPEG, JPG, PNG o GIF)",
                    (file) =>
                        file &&
                        ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(file.type)
                )
                .test(
                    "is-valid-name",
                    "El archivo no debe contener caracteres especiales en el nombre",
                    (file) => file && /^[a-zA-Z0-9.]+$/.test(file.name)
                )
        )
        .min(1, "Debes subir al menos una imagen")
        .required("Este campo es obligatorio"),
    game_archive: mixed<File[]>().optional(),
    game_questions: mixed<File[]>().optional(),
    windows_ejecutable: mixed<File[]>().optional(),
    android_apk: mixed<File[]>().optional(),
});

export function GameForm({
    updateID,
    formAction,
    formData,
    onSubmitSuccess,
    handleCloseSheet,
}: FormProps<GameType>) {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors, isSubmitting },
    } = useForm<GameFormValues>({
        defaultValues: {
            titulo: formAction ? formData?.titulo : "",
            autores: formAction ? formData?.autores : [],
            sinopsis: formAction ? formData?.sinopsis : "",
            aporte_turismo: formAction ? formData?.aporte_turismo : [],
            aporte_cultura: formAction ? formData?.aporte_cultura : [],
            aporte_juventud: formAction ? formData?.aporte_juventud : [],
            aporte_educacion: formAction ? formData?.aporte_educacion : [],
            objetivo: formAction ? formData?.objetivo : "",
            desarrollo_juego: formAction ? formData?.desarrollo_juego : "",
            condiciones_juego: formAction ? formData?.condiciones_juego : [],
            controles: formAction ? formData?.controles : [],
            tecnologias: formAction ? formData?.tecnologias : [],
            estilo: formAction ? formData?.estilo : "",
            genero: formAction ? formData?.genero : [],
            game_window: formAction ? formData?.game_window : "",
            game_images: formAction ? formData?.game_images! : [],
            game_archive: formAction ? formData?.game_archive! : [],
            game_questions: formAction ? formData?.game_questions! : [],
            windows_ejecutable: formAction ? formData?.windows_ejecutable! : [],
            android_apk: formAction ? formData?.android_apk! : [],
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const { toast } = useToast();
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagesPreview, setImagesPreview] = useState<string[]>([]);
    const [archiveFiles, setArchiveFiles] = useState<File[]>([]);
    const [questionFile, setQuestionFile] = useState<File[]>([]);
    const [windowsEFile, setWindowsEFile] = useState<File[]>([]);
    const [androidAPKFile, setAndroidAPKFile] = useState<File[]>([]);
    const autores = useWatch({ control, name: "autores", defaultValue: [] });
    const aporte_turismo = useWatch({
        control,
        name: "aporte_turismo",
        defaultValue: [],
    });
    const aporte_cultura = useWatch({
        control,
        name: "aporte_cultura",
        defaultValue: [],
    });
    const aporte_juventud = useWatch({
        control,
        name: "aporte_juventud",
        defaultValue: [],
    });
    const aporte_educacion = useWatch({
        control,
        name: "aporte_educacion",
        defaultValue: [],
    });
    const condiciones_juego = useWatch({
        control,
        name: "condiciones_juego",
        defaultValue: [],
    });
    const controles = useWatch({ control, name: "controles", defaultValue: [] });
    const tecnologias = useWatch({
        control,
        name: "tecnologias",
        defaultValue: [],
    });
    const genero = useWatch({ control, name: "genero", defaultValue: [] });

    const handleArrayChange = (
        fieldName: keyof GameFormValues,
        values: string[]
    ) => {
        setValue(fieldName, values, { shouldValidate: true });
    };

    const handleImageSelected = (files: File[]) => {
        if (files.length > 0) {
            const newFileURLs = files.map((file) => URL.createObjectURL(file));
            setImagesPreview((prevFiles: any) => [...prevFiles, ...newFileURLs]);
            setImageFiles((prevFiles: any) => [...prevFiles, ...files]);
            setValue("game_images", files, {
                shouldValidate: true,
                shouldTouch: true,
            });
            console.log(files);
        }
    };

    const handleArchiveSelected = (files: File[]) => {
        if (files.length > 0) {
            setArchiveFiles((prevFiles: any) => [...prevFiles, ...files]);
            setValue("game_archive", files, {
                shouldValidate: true,
                shouldTouch: true,
            });
            console.log(files);
        }
    };

    const handleQuestionsSelected = (files: File[]) => {
        if (files.length > 0) {
            setQuestionFile((prevFiles: any) => [...prevFiles, ...files]);
            setValue("game_questions", files, {
                shouldValidate: true,
                shouldTouch: true,
            });
            console.log(files);
        }
    };

    const handleWindowsESelected = (files: File[]) => {
        if (files.length > 0) {
            setWindowsEFile((prevFiles: any) => [...prevFiles, ...files]);
            setValue("windows_ejecutable", files, {
                shouldValidate: true,
                shouldTouch: true,
            });
            console.log(files);
        }
    };

    const handleAndroidAPKSelected = (files: File[]) => {
        if (files.length > 0) {
            setAndroidAPKFile((prevFiles: any) => [...prevFiles, ...files]);
            setValue("android_apk", files, {
                shouldValidate: true,
                shouldTouch: true,
            });
            console.log(files);
        }
    };

    const handleFileRemoved = (index: number) => {
        setArchiveFiles((prevFiles: any) =>
            prevFiles.filter((_: any, i: number) => i !== index)
        );
        setValue(
            "game_archive",
            archiveFiles.filter((_: any, i: number) => i !== index),
            {
                shouldValidate: true,
                shouldTouch: true,
            }
        );
    };

    const handleImageRemoved = (index: number) => {
        setImageFiles((prevFiles: any) =>
            prevFiles.filter((_: any, i: number) => i !== index)
        );
        setImagesPreview((prevFiles: any) =>
            prevFiles.filter((_: any, i: number) => i !== index)
        );
        setValue(
            "game_images",
            imageFiles.filter((_: any, i: number) => i !== index),
            {
                shouldValidate: true,
                shouldTouch: true,
            }
        );
    };

    const handleQuestionRemoved = (index: number) => {
        setQuestionFile((prevFiles: any) =>
            prevFiles.filter((_: any, i: number) => i !== index)
        );
        setValue(
            "game_questions",
            questionFile.filter((_: any, i: number) => i !== index),
            {
                shouldValidate: true,
                shouldTouch: true,
            }
        );
    };
    
    const handleWindowsERemoved = (index: number) => {
        setWindowsEFile((prevFiles: any) =>
            prevFiles.filter((_: any, i: number) => i !== index)
        );
        setValue(
            "windows_ejecutable",
            windowsEFile.filter((_: any, i: number) => i !== index),
            {
                shouldValidate: true,
                shouldTouch: true,
            }
        );
    };

    const handleAndroidAPKRemoved = (index: number) => {
        setQuestionFile((prevFiles: any) =>
            prevFiles.filter((_: any, i: number) => i !== index)
        );
        setValue(
            "android_apk",
            androidAPKFile.filter((_: any, i: number) => i !== index),
            {
                shouldValidate: true,
                shouldTouch: true,
            }
        );
    };

    const onSubmit: SubmitHandler<GameFormValues> = async (data: GameFormValues) => {
        try {
            const formData = new FormData();
            formData.append("titulo", data.titulo);
            data.autores.forEach((autor: string) => {
                formData.append("autores", autor);
            });
            formData.append("sinopsis", data.sinopsis);
            data.aporte_turismo.forEach((turismo: string) => {
                formData.append("aporte_turismo", turismo);
            });
            data.aporte_cultura.forEach((cultura: string) => {
                formData.append("aporte_cultura", cultura);
            });
            data.aporte_juventud.forEach((juventud: string) => {
                formData.append("aporte_juventud", juventud);
            });
            data.aporte_educacion.forEach((educacion: string) => {
                formData.append("aporte_educacion", educacion);
            });
            formData.append("objetivo", data.objetivo);
            formData.append("desarrollo_juego", data.desarrollo_juego);
            data.condiciones_juego.forEach((condicion: string) => {
                formData.append("condiciones_juego", condicion);
            });
            data.controles.forEach((control: string) => {
                formData.append("controles", control);
            });
            data.tecnologias.forEach((tecnologia: string) => {
                formData.append("tecnologias", tecnologia);
            });
            formData.append("estilo", data.estilo);
            data.genero.forEach((genero: string) => {
                formData.append("genero", genero);
            });
            formData.append("game_window", data.game_window);

            imageFiles.forEach((image: File) => {
                formData.append("game_images", image);
            });
            archiveFiles.forEach((file: File) => {
                formData.append("game_archive", file);
            });
            questionFile?.forEach((file: File) => {
                formData.append("game_questions", file);
            });
            windowsEFile?.forEach((file: File) => {
                formData.append("windows_ejecutable", file);
            });
            androidAPKFile?.forEach((file: File) => {
                formData.append("android_apk", file);
            });

            if (imageFiles.length <= 4) {
                if (formAction && updateID) {
                    await UpdateData({ path: "games", data: formData }, updateID!);
                } else {
                    await AddData({ path: "games", data: formData });
                }
            }

            onSubmitSuccess();
            handleCloseSheet();
            toast({
                variant: "success",
                title: `Éxito!`,
                description: `El Juego ${data.titulo} fue ${formAction ? "editado" : "agregado"}`,
                duration: 2000
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Fallo algo durante el proceso, prueba de nuevo",
                duration: 2000
            });
        }
    };

    function handleLoadingText() {
        return formAction
            ? isSubmitting
                ? "Editando Juego"
                : "Editar Juego"
            : isSubmitting
                ? "Agregando Juego"
                : "Agregar Juego";
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="mb-4">
                <label className="block text-gray-700">
                    Título del Juego: <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("titulo")}
                    type="text"
                    placeholder="Ingresa el título del juego"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("", errors?.titulo?.message!)}
            </div>

            <div className="mb-4">
                <MultiInput
                    name="Autor/es:"
                    values={autores}
                    onChange={(val) => handleArrayChange("autores", val)}
                    placeholderText="Ejemplo: Juan Pérez, María López"
                />
                {inputMessageHelper(
                    <div className="flex flex-col gap-2 mt-2">
                        ESPECIFICACIONES:
                        <p>1. Especifica los nombres completos de los autores del proyecto.</p>
                        <p>
                            {formAction &&
                                "2. En el caso de edición, vuelve a ingresar los datos que deseas mantener y añade los nuevos."}
                        </p>
                    </div>,
                    errors?.autores?.message!,
                    errors?.autores
                )}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">
                    Sinopsis: <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("sinopsis")}
                    type="text"
                    placeholder="Describe brevemente el juego"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("Proporciona una descripción general del juego.", errors?.sinopsis?.message!)}
            </div>

            <div className="mb-4">
                <MultiInput
                    name="Aporte al Turismo:"
                    values={aporte_turismo}
                    onChange={(val) => handleArrayChange("aporte_turismo", val)}
                />
                {inputMessageHelper(
                    <div className="flex flex-col gap-2 mt-2">
                        ESPECIFICACIONES:
                        <p>1. Menciona cómo el juego beneficia al turismo.</p>
                        <p>
                            {formAction &&
                                "2. En el caso de edición, vuelve a ingresar los datos que deseas mantener y añade los nuevos."}
                        </p>
                    </div>,
                    errors?.aporte_turismo?.message!,
                    errors?.aporte_turismo
                )}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Aporte a la Cultura:"
                    values={aporte_cultura}
                    onChange={(val) => handleArrayChange("aporte_cultura", val)}
                />
                {inputMessageHelper(<div className="flex flex-col gap-2 mt-2">
                    ESPECIFICACIONES:
                    <p>
                        1. Agregar los aportes del informe.
                        <br />
                    </p>
                    <p>
                        {formAction &&
                            "2. En caso de querer editar los aportes del juego a la cultura se deben volver a ingresar los datos que se quieran mantener y las nuevas (manteniendo el mismo orden), sino dejar vacio este input en el formulario de edición"}
                    </p>
                </div>,
                    errors?.aporte_cultura?.message!,
                    errors?.aporte_cultura
                )}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Aporte a la Juventud:"
                    values={aporte_juventud}
                    onChange={(val) => handleArrayChange("aporte_juventud", val)}
                />
                {inputMessageHelper(
                    <div className="flex flex-col gap-2 mt-2">
                        ESPECIFICACIONES:
                        <p>
                            1. Agregar los aportes del informe.
                            <br />
                        </p>
                        <p>
                            {formAction &&
                                "2. En caso de querer editar los aportes del juego a la juventud se deben volver a ingresar los datos que se quieran mantener y las nuevas (manteniendo el mismo orden), sino dejar vacio este input en el formulario de edición"}
                        </p>
                    </div>,
                    errors?.aporte_juventud?.message!,
                    errors?.aporte_juventud
                )}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Aporte a la Educación:"
                    values={aporte_educacion}
                    onChange={(val) => handleArrayChange("aporte_educacion", val)}
                />
                {inputMessageHelper(
                    <div className="flex flex-col gap-2 mt-2">
                        ESPECIFICACIONES:
                        <p>
                            1. Agregar los aportes del informe.
                            <br />
                        </p>
                        <p>
                            {formAction &&
                                "2. En caso de querer editar los aportes del juego a la educación se deben volver a ingresar los datos que se quieran mantener y las nuevas (manteniendo el mismo orden), sino dejar vacio este input en el formulario de edición"}
                        </p>
                    </div>,
                    errors?.aporte_educacion?.message!,
                    errors?.aporte_educacion
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Objetivo: <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("objetivo")}
                    type="text"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    placeholder="¿Cuáles son los objetivos del juego?"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Poner el objetivo del juego",
                    errors?.objetivo?.message!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Desarrollo: <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("desarrollo_juego")}
                    type="text"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Explicar como fue el desarrollo del juego",
                    errors?.desarrollo_juego?.message!
                )}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Condiciones de Victoria:"
                    values={condiciones_juego}
                    onChange={(val) => handleArrayChange("condiciones_juego", val)}
                />
                {inputMessageHelper(
                    <div className="flex flex-col gap-2 mt-2">
                        ESPECIFICACIONES:
                        <p>
                            1. Agregar cuales son las condiciones del juego.
                            <br />
                        </p>
                        <p>
                            {formAction &&
                                "2. En caso de querer editar las condiciones del juego se deben volver a ingresar los datos que se quieran mantener y las nuevas (manteniendo el mismo orden), sino dejar vacio este input en el formulario de edición"}
                        </p>
                    </div>,
                    errors?.condiciones_juego?.message!,
                    errors?.condiciones_juego
                )}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Controles:"
                    values={controles}
                    onChange={(val) => handleArrayChange("controles", val)}
                />
                {inputMessageHelper(
                    <div className="flex flex-col gap-2 mt-2">
                        ESPECIFICACIONES:
                        <p>
                            1. Agregar cuales son los controles del juego.
                            <br />
                        </p>
                        <p>
                            {formAction &&
                                "2. En caso de querer editar los controles del juego se deben volver a ingresar los datos que se quieran mantener y las nuevas (manteniendo el mismo orden), sino dejar vacio este input en el formulario de edición"}
                        </p>
                    </div>,
                    errors?.controles?.message!,
                    errors?.controles
                )}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Tecnologías:"
                    values={tecnologias}
                    onChange={(val) => handleArrayChange("tecnologias", val)}
                />
                {inputMessageHelper(
                    <div className="flex flex-col gap-2 mt-2">
                        ESPECIFICACIONES:
                        <p>
                            1. Agregar que tecnologias se utilizarón.
                            <br />
                        </p>
                        <p>
                            {formAction &&
                                "2. En caso de querer editar las tecnologias que se utilizaron se deben volver a ingresar los datos que se quieran mantener y las nuevas (manteniendo el mismo orden), sino dejar vacio este input en el formulario de edición"}
                        </p>
                    </div>,
                    errors?.tecnologias?.message!,
                    errors?.tecnologias
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Estilo: <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("estilo")}
                    type="text"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Agregar el estilo que se uso",
                    errors?.estilo?.message!
                )}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Género:"
                    values={genero}
                    onChange={(val) => handleArrayChange("genero", val)}
                />
                {inputMessageHelper(<div className="flex flex-col gap-2 mt-2">
                    ESPECIFICACIONES:
                    <p>
                        1. Agregar el género o los generos a los que pertenece el juego.
                        <br />
                    </p>
                    <p>
                        {formAction &&
                            "2. En caso de querer editar los géneros que se utilizaron se deben volver a ingresar los datos que se quieran mantener y las nuevas (manteniendo el mismo orden), sino dejar vacio este input en el formulario de edición"}
                    </p>
                </div>,
                    errors?.genero?.message!,
                    errors?.genero
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Modo de ventana(vertical/horizontal):{" "}
                    <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("game_window")}
                    type="text"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Poner en que orientación se debe jugar (Horizontal | Vertical)",
                    errors?.game_window?.message!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Imágenes del juego: <span className="font-bold text-red-800">*</span>
                </label>
                <FileUpload
                    files={imagesPreview}
                    onFilesSelected={handleImageSelected}
                    onFileRemoved={handleImageRemoved}
                    limit={4}
                />
                {inputMessageHelper(<div className="flex flex-col gap-2 mt-2">
                    ESPECIFICACIONES:
                    <p>
                        1. Las imágenes no deben contener nombres con caracteres especiales (*
                        - _ / | # { } + = @ ¿ ? : % ! ¡). <br />
                    </p>
                    <p>
                        2. Ingresar solo Archivos de imágenes (JPG, JPEG, PNG o GIF). <br />
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
                    errors?.game_images?.message!,
                    errors?.game_images
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Archivos del juego: <span className="font-bold text-gray-300">*</span>
                </label>
                <FileUpload
                    prev={false}
                    files={archiveFiles}
                    onFilesSelected={handleArchiveSelected}
                    onFileRemoved={handleFileRemoved}
                    limit={4}
                />
                {inputMessageHelper(
                    <div className="flex flex-col gap-2 mt-2">
                        ESPECIFICACIONES:
                        <p>
                            1. Las archivos de los juegos son opcionales, en caso de no poder adaptarse la build a web solamente se debe subir el informe del juego. <br />
                        </p>
                        <p>
                            2. Las archivos no deben contener nombres con caracteres especiales (*
                            - _ / | # { } + = @ ¿ ? : % ! ¡). <br />
                        </p>
                        <p>
                            3. Ingresar solo los Archivos que corresponden a la build del juego. <br />
                        </p>
                        <p>
                            {formAction &&
                                "4. En caso de editar los archivos del juego se deben volver a ingresar los que se quieran mantener y los nuevos (o solamente las nuevos)"}
                        </p>
                    </div>,
                    errors?.game_archive?.message!,
                    errors?.game_archive
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    StreamingAssets: <span className="font-bold text-gray-300">*</span>
                </label>
                <FileUpload
                    prev={false}
                    files={questionFile}
                    onFilesSelected={handleQuestionsSelected}
                    onFileRemoved={handleQuestionRemoved}
                    limit={1}
                />
                {inputMessageHelper(
                    <div className="flex flex-col gap-2 mt-2">
                        ESPECIFICACIONES:
                        <p>
                            1. No es obligatorio este campo. <br />
                        </p>
                        <p>
                            2. El archivo no debe contener nombres con caracteres especiales (* - _ / | # { } + = @ ¿ ? : % ! ¡). <br />
                        </p>
                        <p>
                            {formAction &&
                                "3. En caso de editar los streamingAssets del juego se debe volver a ingresar el archivo que se quiera mantener o el nuevo."}
                        </p>
                    </div>,
                    errors?.game_images?.message!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Ejecutable para Windows: <span className="font-bold text-gray-300">*</span>
                </label>
                <FileUpload
                    prev={false}
                    files={windowsEFile}
                    onFilesSelected={handleWindowsESelected}
                    onFileRemoved={handleWindowsERemoved}
                    limit={1}
                />
                {inputMessageHelper(
                    <div className="flex flex-col gap-2 mt-2">
                        ESPECIFICACIONES:
                        <p>
                            1. No es obligatorio este campo. <br />
                        </p>
                        <p>
                            2. El archivo no debe contener nombres con caracteres especiales (* - _ / | # { } + = @ ¿ ? : % ! ¡). <br />
                        </p>
                        <p>
                            {formAction &&
                                "3. En caso de editar el ejecutable del juego para windows, se debe volver a ingresar el archivo que se quiera mantener o el nuevo."}
                        </p>
                    </div>,
                    errors?.game_images?.message!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Android APK: <span className="font-bold text-gray-300">*</span>
                </label>
                <FileUpload
                    prev={false}
                    files={androidAPKFile}
                    onFilesSelected={handleAndroidAPKSelected}
                    onFileRemoved={handleAndroidAPKRemoved}
                    limit={1}
                />
                {inputMessageHelper(
                    <div className="flex flex-col gap-2 mt-2">
                        ESPECIFICACIONES:
                        <p>
                            1. No es obligatorio este campo. <br />
                        </p>
                        <p>
                            2. El archivo no debe contener nombres con caracteres especiales (* - _ / | # { } + = @ ¿ ? : % ! ¡). <br />
                        </p>
                        <p>
                            {formAction &&
                                "3. En caso de editar el apk para android se debe volver a ingresar el archivo que se quiera mantener o el nuevo."}
                        </p>
                    </div>,
                    errors?.game_images?.message!
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