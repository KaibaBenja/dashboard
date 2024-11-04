"use client";

import { useState } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, mixed, ObjectSchema, array } from 'yup';

import { UpdateData } from "@/queries/UpdateData";
import { AddData } from "@/queries/AddData";
import { GameType } from "@/types/GameTypes";
import { FormProps } from "@/types/formProps";

import { FileUpload } from "../table-actions/custom-inputs/file-upload";
import { Button } from "../ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "../ui/use-toast";
import { MultiInput } from "../table-actions/custom-inputs/multi-inputs";

interface GameFormValues {
    titulo: string;
    autores: string[];
    sinopsis: string;
    aporte_turismo: string;
    aporte_cultura: string;
    aporte_juventud: string;
    aporte_educacion: string;
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
    game_questions: File[];
}

const schema: ObjectSchema<GameFormValues> = object({
    titulo: string().required("El título es requerido"),
    autores: array(string())
        .of(string().required("Cada autor debe ser un texto"))
        .required("Debe especificar al menos un autor")
        .min(1, "Debe incluir al menos un autor"),
    sinopsis: string().required("La sinopsis es requerida"),
    aporte_turismo: string().required("El aporte al turismo es requerido"),
    aporte_cultura: string().required("El aporte a la cultura es requerido"),
    aporte_juventud: string().required("El aporte a la juventud es requerido"),
    aporte_educacion: string().required("El aporte a la educación es requerido"),
    objetivo: string().required("El objetivo es requerido"),
    desarrollo_juego: string().required("El desarrollo es requerido"),
    condiciones_juego: array().of(string().required()).min(1, "Se requiere al menos una condición"),
    controles: array().of(string().required()).min(1, "Se requiere al menos un control"),
    tecnologias: array().of(string().required()).min(1, "Se requiere al menos una tecnología"),
    estilo: string().required("El estilo es requerido"),
    genero: array().of(string().required()).min(1, "Se requiere al menos un género"),
    game_window: string().required("Se requiere colocar la direccion del juego(Horizontal/Vertical)"),
    game_images: mixed().test("fileSize", "Se requiere al menos una imagen", (value) => value && value.length > 0),
    game_archive: mixed().test("fileSize", "Se requiere al menos un archivo", (value) => value && value.length > 0),
    game_questions: mixed().test("fileSize", "Se requiere al menos una pregunta", (value) => value && value.length > 0),
});

export function GameForm({ updateID, formAction, formData, onSubmitSuccess, handleCloseSheet }: FormProps<GameType>) {
    const { register, handleSubmit, setValue, control, formState: { errors, isSubmitting } } = useForm<GameFormValues>({
        defaultValues: {
            titulo: formData?.titulo || "",
            autores: formData?.autores || [],
            sinopsis: formData?.sinopsis || "",
            aporte_turismo: formData?.aporte_turismo || "",
            aporte_cultura: formData?.aporte_cultura || "",
            aporte_juventud: formData?.aporte_juventud || "",
            aporte_educacion: formData?.aporte_educacion || "",
            objetivo: formData?.objetivo || "",
            desarrollo_juego: formData?.desarrollo_juego || "",
            condiciones_juego: formData?.condiciones_juego || [],
            controles: formData?.controles || [],
            tecnologias: formData?.tecnologias || [],
            estilo: formData?.estilo || "",
            genero: formData?.genero || [],
            game_images: [],
            game_archive: [],
            game_questions: [],
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const { toast } = useToast();

    const [imageFiles, setImageFiles] = useState<string[] | File[]>([]);
    const [archiveFiles, setArchiveFiles] = useState<string[] | File[]>([]);
    const [questionFiles, setQuestionFiles] = useState<string[] | File[]>([]);
    const autores = useWatch({ control, name: "autores", defaultValue: [] });
    const condiciones_juego = useWatch({ control, name: "condiciones_juego", defaultValue: [] });
    const controles = useWatch({ control, name: "controles", defaultValue: [] });
    const tecnologias = useWatch({ control, name: "tecnologias", defaultValue: [] });
    const genero = useWatch({ control, name: "genero", defaultValue: [] });
    const handleArrayChange = (fieldName: keyof GameFormValues, values: string[]) => {
        console.log(`Actualizando ${fieldName}:`, values); // Log para ver qué se está pasando
        setValue(fieldName, values, { shouldValidate: true });
    };

    const handleFilesSelected = (files: File[], type: "game_images" | "game_archive" | "game_questions") => {
        console.log(`Archivos seleccionados para ${type}:`, files); // Log para ver qué archivos se están seleccionando
        setValue(type, files, { shouldValidate: true });
    };


    const onSubmit: SubmitHandler<GameFormValues> = async (data) => {
        console.log("Formulario enviado:", data);
        console.log("Errores de validación:", errors); // Verifica errores aquí
    
        if (isSubmitting) {
            console.log("El formulario ya se está enviando");
            return;
        }
    
        try {
            const formData = new FormData();
            for (const [key, value] of Object.entries(data)) {
                if (Array.isArray(value)) {
                    value.forEach((file) => formData.append(key, file));
                } else {
                    formData.append(key, value);
                }
            }
    
            if (formAction && updateID) {
                await UpdateData({ path: "games", data: formData }, updateID);
            } else {
                await AddData({ path: "games", data: formData });
            }
            console.log(formData);
            
            onSubmitSuccess();
            handleCloseSheet();
            toast({ variant: "success", title: `Éxito!`, description: `El Juego ${data.titulo} fue ${formAction ? "editado" : "agregado"}` });
        } catch (error) {
            console.error(error);
            toast({ variant: "destructive", title: "Error!", description: "Fallo algo durante el proceso, prueba de nuevo" });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="mb-4">
                <label className="block text-gray-700">Título:</label>
                <input
                    {...register("titulo")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.titulo && <p className="text-red-700 p-2 font-semibold">{errors?.titulo?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Autor/es:</label>
                <MultiInput values={autores} onChange={(val) => handleArrayChange("autores", val)} />
                {errors?.autores && <p className="text-red-700 p-2 font-semibold">{errors?.autores?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Sinopsis:</label>
                <input
                    {...register("sinopsis")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.sinopsis && <p className="text-red-700 p-2 font-semibold">{errors?.sinopsis?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Aporte al Turismo:</label>
                <input
                    {...register("aporte_turismo")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.aporte_turismo && <p className="text-red-700 p-2 font-semibold">{errors?.aporte_turismo?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Aporte a la Cultura:</label>
                <input
                    {...register("aporte_cultura")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.aporte_cultura && <p className="text-red-700 p-2 font-semibold">{errors?.aporte_cultura?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Aporte a la Juventud:</label>
                <input
                    {...register("aporte_juventud")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.aporte_juventud && <p className="text-red-700 p-2 font-semibold">{errors?.aporte_juventud?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Aporte a la Educación:</label>
                <input
                    {...register("aporte_educacion")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.aporte_educacion && <p className="text-red-700 p-2 font-semibold">{errors?.aporte_educacion?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Objetivo:</label>
                <input
                    {...register("objetivo")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.objetivo && <p className="text-red-700 p-2 font-semibold">{errors?.objetivo?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Desarrollo:</label>
                <input
                    {...register("desarrollo_juego")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.desarrollo_juego && <p className="text-red-700 p-2 font-semibold">{errors?.desarrollo_juego?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Condiciones de Victoria:</label>
                <MultiInput values={condiciones_juego} onChange={(val) => handleArrayChange("condiciones_juego", val)} />
                {errors?.condiciones_juego && <p className="text-red-700 p-2 font-semibold">{errors?.condiciones_juego?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Controles:</label>
                <MultiInput values={controles} onChange={(val) => handleArrayChange("controles", val)} />
                {errors?.controles && <p className="text-red-700 p-2 font-semibold">{errors?.controles?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Tecnologías:</label>
                <MultiInput values={tecnologias} onChange={(val) => handleArrayChange("tecnologias", val)} />
                {errors?.tecnologias && <p className="text-red-700 p-2 font-semibold">{errors?.tecnologias?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Estilo:</label>
                <input
                    {...register("estilo")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.estilo && <p className="text-red-700 p-2 font-semibold">{errors?.estilo?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Género:</label>
                <MultiInput values={genero} onChange={(val) => handleArrayChange("genero", val)} />
                {errors?.genero && <p className="text-red-700 p-2 font-semibold">{errors?.genero?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Modo de ventana(vertical/horizontal):</label>
                <input
                    {...register("game_window")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.game_window && <p className="text-red-700 p-2 font-semibold">{errors?.game_window?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Imágenes del juego:</label>
                <FileUpload files={imageFiles} onFilesSelected={(files) => handleFilesSelected(files, "game_images")} limit={5} />
                {errors?.game_images?.message && <p className="text-red-700 p-2 font-semibold">{errors?.game_images?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Archivos del juego:</label>
                <FileUpload files={archiveFiles} onFilesSelected={(files) => handleFilesSelected(files, "game_archive")} limit={5} />
                {errors?.game_archive?.message && <p className="text-red-700 p-2 font-semibold">{errors?.game_archive?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Preguntas del juego:</label>
                <FileUpload files={questionFiles} onFilesSelected={(files) => handleFilesSelected(files, "game_questions")} limit={5} />
                {errors?.game_questions?.message && <p className="text-red-700 p-2 font-semibold">{errors?.game_questions?.message}</p>}
            </div>
            <div className="col-span-2 flex justify-end">
                <button type="submit" className="mr-2 bg-green-800 w-full" disabled={isSubmitting}>
                    {isSubmitting && <AiOutlineLoading3Quarters className="animate-spin mr-2 text-[#FFFFFF]" />}
                    {isSubmitting ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Guardar"}
                </button>
            </div>
        </form>
    );
}
