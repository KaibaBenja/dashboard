"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ObjectSchema } from "yup";

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
    fecha: string;
    horario: string;
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
    fecha: string()
        .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Formato inválido. Use DD/MM/YYYY.")
        .required("La fecha del evento es obligatoria.")
        .defined(),
    horario: string()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato inválido. Use HH:MM.")
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
            fecha: formAction ? formData?.fecha : "",
            horario: formAction ? formData?.horario : "",
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const { toast } = useToast();
    const [fecha, setFecha] = useState<string>("");
    const [horario, setHorario] = useState<string>("");

    const formatHorario = (value: string) => {
        const numeros = value.replace(/\D/g, "");
        const hours = numeros.substring(0, 2);
        const minutes = numeros.substring(2, 4);

        let formatted = hours;
        if (minutes) formatted += `:${minutes}`;

        return formatted;
    };

    const formatFecha = (value: string) => {
        const numeros = value.replace(/\D/g, "");

        const day = numeros.substring(0, 2);
        const month = numeros.substring(2, 4);
        const year = numeros.substring(4, 8);

        let formatted = day;
        if (month) formatted += `/${month}`;
        if (year) formatted += `/${year}`;

        return formatted;
    };

    const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const formattedValue = formatFecha(value);
        const [dd, mm] = formattedValue.split("/").map(Number);

        if (dd > 31 || mm > 12) {
            return;
        }

        setFecha(formattedValue);
    };

    const handleHorarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const formattedValue = formatHorario(value);

        const [hh, mm] = formattedValue.split(":").map(Number);
        if (hh > 23 || mm > 59) return;

        setHorario(formattedValue);
    };

    const onSubmit: SubmitHandler<EventFormValues> = async (
        data: EventFormValues
    ) => {
        try {
            if (formAction && formData) {
                await UpdateData({
                        path: "events",
                        data
                    },
                    formData?._id
                );
                console.log("Edit");
            } else {
                await AddData({
                    path: "events",
                    data,
                });
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
                    Fecha <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("fecha")}
                    type="text"
                    placeholder="Ej: 25/12/2024"
                    value={fecha}
                    onChange={handleFechaChange}
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Formato requerido: DD/MM/YYYY.",
                    errors?.fecha?.message!,
                    errors?.fecha!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Horario <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("horario")}
                    type="text"
                    placeholder="Ej: 19:00"
                    value={horario}
                    onChange={handleHorarioChange}
                    maxLength={5}
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Formato requerido: HH:MM.",
                    errors?.horario?.message!,
                    errors?.horario!
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
