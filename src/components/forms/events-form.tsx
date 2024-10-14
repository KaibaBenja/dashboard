import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ObjectSchema } from 'yup';

import { UpdateData } from "@/queries/UpdateData";
import { AddData } from "@/queries/AddData";
import { EventType } from "@/types/EventTypes";
import { FormProps } from "@/types/formProps";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { inputMessageHelper } from "../handlers/input-helper";

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
    const { toast } = useToast();

    const onSubmit: SubmitHandler<EventFormValues> = async (data: any) => {
        try {
            if (formAction && formData) {
                await UpdateData({path: "events", data }, formData?._id);
                console.log("Edit");
            } else {
                await AddData({path: "events", data });
                console.log("Add");
            }
            onSubmitSuccess();
            handleCloseSheet();
            toast({
                variant: "success",
                title: `Exito!`,
                description: `El Evento ${data?.event_name} fue ${formAction ? "editado" : "agregado"}`,
            });
            console.log("Form formData:", data);
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Ocurrio un Error!",
                description: "Fallo algo durante el proceso, pruebe de nuevo",
            });
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
                <label className="block text-gray-700">
                    Fecha <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("fecha")}
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("Ejemplo del Formato: DD/MM/YYYY", errors?.fecha?.message!, errors?.fecha!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Horario <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("horario")}
                    type="text"
                    placeholder="HH:MM"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("Ejemplo del Formato: HH:MM", errors?.horario?.message!, errors?.horario!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Nombre del Evento <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("event_name")}
                    type="text"
                    placeholder="Nombre del evento"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("", errors?.event_name?.message!, errors?.event_name!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Descripción <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("descripcion")}
                    type="text"
                    placeholder="Descripción del evento"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("", errors?.descripcion?.message!, errors?.descripcion!)}
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