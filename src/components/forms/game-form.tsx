import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ObjectSchema } from 'yup';
import { UpdateData } from "@/queries/UpdateData";
import { AddData } from "@/queries/AddData";
import { GameType } from "@/types/GameTypes";
import { FormProps } from "@/types/formProps";

import { Button } from "../ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface GameFormValues {
    titulo: string;
    autor: string;
    sinopsis: string;
    aporte_turismo: string;
    aporte_cultura: string;
    aporte_juventud: string;
    aporte_educacion: string;
    objetivo: string;
    desarrollo: string;
    condiciones: string;
    controles: string;
    caracteristicas: string;
    tecnologias: string;
    estilo: string;
    genero: string;
    game_images: string;
}

const schema: ObjectSchema<GameFormValues> = object({
    titulo: string().required("El título es requerido").defined(),
    autor: string().required("El autor es requerido").defined(),
    sinopsis: string().required("La sinopsis es requerida").defined(),
    aporte_turismo: string().required("El aporte al turismo es requerido").defined(),
    aporte_cultura: string().required("El aporte a la cultura es requerido").defined(),
    aporte_juventud: string().required("El aporte a la juventud es requerido").defined(),
    aporte_educacion: string().required("El aporte a la educación es requerido").defined(),
    objetivo: string().required("El objetivo es requerido").defined(),
    desarrollo: string().required("El desarrollo es requerido").defined(),
    condiciones: string().required("Las condiciones son requeridas").defined(),
    controles: string().required("Los controles son requeridos").defined(),
    caracteristicas: string().required("Las características son requeridas").defined(),
    tecnologias: string().required("Las tecnologías son requeridas").defined(),
    estilo: string().required("El estilo es requerido").defined(),
    genero: string().required("El género es requerido").defined(),
    game_images: string().required("Las imágenes del juego son requeridas").defined(),
});

export function GameForm({ formAction, formData, onSubmitSuccess, handleCloseSheet }: FormProps<GameType>) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<GameFormValues>({
        defaultValues: {
            titulo: formAction ? formData?.titulo : "",
            autor: formAction ? formData?.autor : "",
            sinopsis: formAction ? formData?.sinopsis : "",
            aporte_turismo: formAction ? formData?.aporte_turismo : "",
            aporte_cultura: formAction ? formData?.aporte_cultura : "",
            aporte_juventud: formAction ? formData?.aporte_juventud : "",
            aporte_educacion: formAction ? formData?.aporte_educacion : "",
            objetivo: formAction ? formData?.objetivo : "",
            desarrollo: formAction ? formData?.desarrollo : "",
            condiciones: formAction ? formData?.condiciones : "",
            controles: formAction ? formData?.controles : "",
            caracteristicas: formAction ? formData?.caracteristicas : "",
            tecnologias: formAction ? formData?.tecnologias : "",
            estilo: formAction ? formData?.estilo : "",
            genero: formAction ? formData?.genero : "",
            game_images: formAction ? formData?.game_images : "",
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<GameFormValues> = async (data: any) => {
        try {
            if (formAction && formData) {
                await UpdateData({path: "games", data }, formData?._id);
                console.log("Edit");
            } else {
                await AddData({path: "games", data });
                console.log("Add");
            }
            onSubmitSuccess();
            handleCloseSheet();
            console.log("Form formData:", data);
        } catch (error) {
            console.log(error);
        }
    };

    function handleLoadingText() {
        if (formAction) {
            return isSubmitting ? "Editando Evento" : "Editar Evento";
        } else {
            return isSubmitting ? "Agregando Evento" : "Agregar Evento";
        }
    }

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
                <label className="block text-gray-700">Autor:</label>
                <input
                    {...register("autor")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.autor && <p className="text-red-700 p-2 font-semibold">{errors?.autor?.message}</p>}
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
                    {...register("desarrollo")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.desarrollo && <p className="text-red-700 p-2 font-semibold">{errors?.desarrollo?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Condiciones:</label>
                <input
                    {...register("condiciones")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.condiciones && <p className="text-red-700 p-2 font-semibold">{errors?.condiciones?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Controles:</label>
                <input
                    {...register("controles")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.controles && <p className="text-red-700 p-2 font-semibold">{errors?.controles?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Características:</label>
                <input
                    {...register("caracteristicas")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.caracteristicas && <p className="text-red-700 p-2 font-semibold">{errors?.caracteristicas?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Tecnologías:</label>
                <input
                    {...register("tecnologias")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
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
                <input
                    {...register("genero")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.genero && <p className="text-red-700 p-2 font-semibold">{errors?.genero?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Imágenes del Juego:</label>
                <input
                    {...register("game_images")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.game_images && <p className="text-red-700 p-2 font-semibold">{errors?.game_images?.message}</p>}
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
