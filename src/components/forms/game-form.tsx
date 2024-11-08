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
    game_images: File[];
    game_archive: File[];
    game_questions?: string | File;
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
        .required("El aporte al turismo es requerido"),
    aporte_cultura: array()
        .of(string().required())
        .required("El aporte a la cultura es requerido"),
    aporte_juventud: array()
        .of(string().required())
        .required("El aporte a la juventud es requerido"),
    aporte_educacion: array()
        .of(string().required())
        .required("El aporte a la educación es requerido"),
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
    game_images: mixed<File[]>()
        .required("Se debe ingresar al menos una imagen")
        .defined(),
    game_archive: mixed<File[]>()
        .required("Se debe ingresar al menos una imagen")
        .defined(),
    game_questions: mixed<string | File>()
        .test("is-csv", "El archivo debe ser un CSV", (value: any) => {
            return !value || (value && value[0]?.type === "text/csv");
        })
        .optional(),
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
            game_images: [],
            game_archive: [],
            game_questions: "",
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const { toast } = useToast();

    const [imageFiles, setImageFiles] = useState<string[] | File[]>([]);
    const [archiveFiles, setArchiveFiles] = useState<string[] | File[]>([]);
    const [questionFile, setQuestionFile] = useState<string | File>("");
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
            setImageFiles(newFileURLs);
            setValue("game_images", files, {
                shouldValidate: true,
                shouldTouch: true,
            });
            console.log(files);
        }
    };

    const handleArchiveSelected = (files: File[]) => {
        if (files.length > 0) {
            const newFileURLs = files.map((file) => URL.createObjectURL(file));
            setArchiveFiles(newFileURLs);
            setValue("game_archive", files, {
                shouldValidate: true,
                shouldTouch: true,
            });
            console.log(files);
        }
    };

    const handleQuestionsSelected = (file: File) => {
        const newFileURL = URL.createObjectURL(file);
        setQuestionFile(newFileURL);
        setValue("game_questions", file, {
            shouldValidate: true,
            shouldTouch: true,
        });
        console.log(file);
    };

    const handleFileRemoved = (field: any) => {
        setValue(field, "", { shouldValidate: true });
    };

    const onSubmit: SubmitHandler<GameFormValues> = async (data) => {
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
            data.game_images.forEach((image: File) => {
                formData.append("game_images", image);
            });
            data.game_archive.forEach((file: File) => {
                formData.append("game_archive", file);
            });

            if(data.game_questions) {
                formData.append("game_questions", data.game_questions);
            }

            if (formAction && updateID) {
                await UpdateData({ path: "games", data: formData }, updateID);
            } else {
                await AddData({ path: "games", data: formData });
            }

            onSubmitSuccess();
            handleCloseSheet();
            toast({
                variant: "success",
                title: `Éxito!`,
                description: `El Juego ${data.titulo} fue ${formAction ? "editado" : "agregado"
                    }`,
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Fallo algo durante el proceso, prueba de nuevo",
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("", errors?.autores?.message!)}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Autor/es:"
                    values={autores}
                    onChange={(val) => handleArrayChange("autores", val)}
                />
                {inputMessageHelper("Poner autor o autores del proyecto", errors?.autores?.message!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Sinopsis: <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("sinopsis")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("Sinopsis del juego", errors?.sinopsis?.message!)}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Aporte al Turismo:"
                    values={aporte_turismo}
                    onChange={(val) => handleArrayChange("aporte_turismo", val)}
                />
                {inputMessageHelper("Agregar los aportes del informe", errors?.aporte_turismo?.message!)}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Aporte a la Cultura:"
                    values={aporte_cultura}
                    onChange={(val) => handleArrayChange("aporte_cultura", val)}
                />
                {inputMessageHelper("Agregar los aportes del informe", errors?.aporte_cultura?.message!)}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Aporte a la Juventud:"
                    values={aporte_juventud}
                    onChange={(val) => handleArrayChange("aporte_juventud", val)}
                />
                {inputMessageHelper("Agregar los aportes del informe", errors?.aporte_juventud?.message!)}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Aporte a la Educación:"
                    values={aporte_educacion}
                    onChange={(val) => handleArrayChange("aporte_educacion", val)}
                />
                {inputMessageHelper("Agregar los aportes del informe", errors?.aporte_educacion?.message!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Objetivo: <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("objetivo")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("Poner el objetivo del juego", errors?.objetivo?.message!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Desarrollo:</label>
                <input
                    {...register("desarrollo_juego")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("Explicar como fue el desarrollo del juego", errors?.desarrollo_juego?.message!)}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Condiciones de Victoria:"
                    values={condiciones_juego}
                    onChange={(val) => handleArrayChange("condiciones_juego", val)}
                />
                {inputMessageHelper("Agregar cuales son las condiciones del juego", errors?.condiciones_juego?.message!)}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Controles:"
                    values={controles}
                    onChange={(val) => handleArrayChange("controles", val)}
                />
                {inputMessageHelper("Agregar cuales son los controles del juego", errors?.controles?.message!)}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Tecnologías:"
                    values={tecnologias}
                    onChange={(val) => handleArrayChange("tecnologias", val)}
                />
                {inputMessageHelper("Agregar que tecnologias se utilizarón", errors?.tecnologias?.message!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Estilo: <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("estilo")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("Agregar el estilo que se uso", errors?.estilo?.message!)}
            </div>
            <div className="mb-4">
                <MultiInput
                    name="Género:"
                    values={genero}
                    onChange={(val) => handleArrayChange("genero", val)}
                />
                {inputMessageHelper("Agregar el genero o los generos a los que pertenece el juego", errors?.genero?.message!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Modo de ventana(vertical/horizontal): <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("game_window")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("Poner en que orientación se debe jugar (Horizontal | Vertical)", errors?.game_window?.message!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Imágenes del juego: <span className="font-bold text-red-800">*</span>
                </label>
                <FileUpload
                    files={imageFiles}
                    onFilesSelected={handleImageSelected}
                    onFileRemoved={() => handleFileRemoved("game_images")}
                    limit={4}
                />
                {errors?.game_images?.message && (
                    <p className="text-red-700 p-2 font-semibold">
                        {errors?.game_images?.message}
                    </p>
                )}
                {inputMessageHelper(
                    "Las imagenes no contener nombres con caracteres especiales (* - _  / | # { } + = @ ¿ ? : % ! ¡)",
                    errors?.game_images?.message!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Archivos del juego: <span className="font-bold text-red-800">*</span>
                </label>
                <FileUpload
                    prev={false}
                    files={archiveFiles}
                    onFilesSelected={handleArchiveSelected}
                    onFileRemoved={() => handleFileRemoved("game_archive")}
                    limit={4}
                />
                {inputMessageHelper(
                    "Archivos de la build: Subir en orden loaderUrl, dataUrl, frameworkUrl, codeUrl",
                    errors?.game_archive?.message!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Preguntas del juego:</label>
                {/* <div className="w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 border-dashed">
                    <div className="grid gap-3">
                        <div className="grid gap-2">
                            <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
                                Preguntas de los juegos
                            </h4>
                            <div className="flex items-center justify-center">
                                <label>
                                    <input type="file" {...register("game_questions")} hidden />
                                    <div className="flex w-auto h-9 px-2 flex-col bg-[#66cc00] rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                                        Agregar preguntas
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div> */}
                <FileUpload
                    prev={false}
                    files={questionFile}
                    onFilesSelected={handleQuestionsSelected}
                    onFileRemoved={() => handleFileRemoved("game_archive")}
                    limit={4}
                />
                {inputMessageHelper(
                    "Archivo CSV con la pregunta del juego (no es obligatorio este input)",
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