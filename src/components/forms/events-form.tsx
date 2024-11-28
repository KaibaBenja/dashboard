"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ObjectSchema, number } from "yup";

import { UpdateData } from "@/queries/UpdateData";
import { AddData } from "@/queries/AddData";
import { EventType } from "@/types/EventTypes";
import { FormProps } from "@/types/formProps";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { inputMessageHelper } from "../handlers/input-helper";

interface EventFormValues {
    event_name: string;
    direccion: string;
    descripcion: string;
    fecha_comienzo: string;
    duracion_evento: number;
    horario_comienzo: string;
    horario_fin: string;
}

const schema: ObjectSchema<EventFormValues> = object({
    event_name: string()
        .required("El nombre del evento es obligatorio.")
        .defined(),
    direccion: string()
        .required("La dirección del evento es obligatoria.")
        .defined(),
    descripcion: string()
        .required("La descripción del evento es obligatoria.")
        .defined(),
    fecha_comienzo: string()
        .required("La fecha del evento es obligatoria.")
        .defined(),
    duracion_evento: number()
        .required("La fecha del evento es obligatoria.")
        .defined(),
    horario_comienzo: string()
        .required("El horario del evento es obligatorio.")
        .defined(),
    horario_fin: string()
        .required("El horario del evento es obligatorio.")
        .defined(),
});

export function EventForm({
    formAction,
    formData,
    onSubmitSuccess,
    handleCloseSheet,
}: FormProps<EventType>) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EventFormValues>({
        defaultValues: {
            event_name: formAction ? formData?.event_name : "",
            descripcion: formAction ? formData?.descripcion : "",
            direccion: formAction ? formData?.direccion.split("|")[0] : "",
            fecha_comienzo: formAction ? formData?.fecha_comienzo : "",
            duracion_evento: formAction ? formData?.duracion_evento : 1,
            horario_comienzo: formAction ? formData?.horario_comienzo : "",
            horario_fin: formAction ? formData?.horario_fin : "",
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const { toast } = useToast();

    const onSubmit: SubmitHandler<EventFormValues> = async (
        data: EventFormValues
    ) => {

        try {
            if (formAction && formData) {
                await UpdateData({ path: "events", data }, formData?._id);
                console.log("Edit");
            } else {
                await AddData({ path: "events", data });
                console.log("Add");
            }
            onSubmitSuccess();
            handleCloseSheet();
            toast({
                variant: "success",
                title: `¡Éxito!`,
                description: `El evento "${data?.event_name}" fue ${formAction ? "editado" : "agregado"
                    } exitosamente.`,
            });
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "¡Ocurrió un error!",
                description: `Algo salió mal durante el proceso. Por favor, intente nuevamente. (${error})`,
            });
        }
    };

    function handleLoadingText() {
        if (formAction) {
            return isSubmitting ? "Editando evento..." : "Editar evento";
        } else {
            return isSubmitting ? "Agregando evento..." : "Agregar evento";
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="mb-4">
                <label className="block text-gray-700">
                    Nombre del Evento <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("event_name")}
                    type="text"
                    placeholder="Ingrese el nombre del evento (Ej: Fiesta de Verano)"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Nombre identificador del evento.",
                    errors?.event_name?.message!,
                    errors?.event_name!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Dirección del Evento <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("direccion")}
                    type="text"
                    placeholder="Ej: Av. Libertador 1234, Salón del Río"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Calle, número o lugar del evento.",
                    errors?.direccion?.message!,
                    errors?.direccion!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Descripción <span className="font-bold text-red-800">*</span>
                </label>
                <textarea
                    {...register("descripcion")}
                    rows={4}
                    placeholder="Describa brevemente el evento (Ej: Reunión para celebrar el aniversario de la empresa)."
                    className="w-full px-2 py-2 border rounded-lg resize-none focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Incluya detalles sobre el propósito o contenido del evento.",
                    errors?.descripcion?.message!,
                    errors?.descripcion!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Fecha de Inicio <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("fecha_comienzo")}
                    type="date"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Fecha del Evento",
                    errors?.fecha_comienzo?.message!,
                    errors?.fecha_comienzo!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Fecha de Fin <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("duracion_evento")}
                    type="number"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Cantidad de dias del evento de que dure más de un día",
                    errors?.duracion_evento?.message!,
                    errors?.duracion_evento!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Horario <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("horario_comienzo")}
                    type="time"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Comienzo del Evento",
                    errors?.horario_comienzo?.message!,
                    errors?.horario_comienzo!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Horario <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("horario_fin")}
                    type="time"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Fin del Evento",
                    errors?.horario_fin?.message!,
                    errors?.horario_fin!
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
