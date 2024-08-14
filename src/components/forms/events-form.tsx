import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ObjectSchema } from 'yup';
import { EventType } from "@/types/EventTypes";
import { AddEvent, UpdateEvent } from "@/queries/Events";

import { Button } from "../ui/button";

import { FormProps } from "@/types/formProps";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface EventFormValues {
    fecha: string;
    horario: string;
    event_name: string;
    descripcion: string;
}

const schema: ObjectSchema<EventFormValues> = object({
    fecha: string()
        .required("La fecha es requerida")
        .defined(),
    horario: string()
        .required("El horario es requerido")
        .defined(),
    event_name: string()
        .required("El nombre del evento es requerido")
        .defined(),
    descripcion: string()
        .required("La descripción es requerida")
        .defined(),
});

export function EventForm({ formAction, formData, onSubmitSuccess, handleCloseSheet }: FormProps<EventType>) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EventFormValues>({
        defaultValues: {
            fecha: formAction ? formData?.fecha : "",
            horario: formAction ? formData?.horario : "",
            event_name: formAction ? formData?.event_name : "",
            descripcion: formAction ? formData?.descripcion : "",
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<EventFormValues> = async (data: any) => {
        try {
            if (formAction && formData) {
                await UpdateEvent(formData?._id, data);
                console.log("Edit");
            } else {
                await AddEvent(data);
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
                <label className="block text-gray-700">Fecha:</label>
                <input
                    {...register("fecha")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.fecha && <p className="text-red-700 p-2 font-semibold">{errors?.fecha?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Horario:</label>
                <input
                    {...register("horario")}
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.horario && <p className="text-red-700 p-2 font-semibold">{errors?.horario?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Categoria:</label>
                <input
                    {...register("event_name")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.event_name && <p className="text-red-700 p-2 font-semibold">{errors?.event_name?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Descripción:</label>
                <input
                    {...register("descripcion")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.descripcion && <p className="text-red-700 p-2 font-semibold">{errors?.descripcion?.message}</p>}
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