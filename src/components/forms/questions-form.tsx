"use client";

import { useState } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ObjectSchema, number, boolean, mixed } from "yup";

import { UpdateData } from "@/queries/UpdateData";
import { DeleteData } from "@/queries/DeleteData";
import { AddData } from "@/queries/AddData";
import { EventType } from "@/types/EventTypes";
import { FormProps } from "@/types/formProps";

import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { inputMessageHelper } from "../handlers/input-helper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { QuestionType } from "@/types/QuestionTypes";
import { MultiInput } from "../table-actions/custom-inputs/multi-inputs";
import { UpdateQuestion } from "@/queries/UpdateQuestion";

interface QuestionFormValues {
    question: string;
    catName: string;
    answers: string[];
    correctAnswerIndex: number;

}

const schema: ObjectSchema<QuestionFormValues> = object({
    question: string()
        .required("El nombre del evento es obligatorio.")
        .defined(),
    catName: string()
        .required("La dirección del evento es obligatoria.")
        .defined(),
    answers: mixed<string[]>()
        .required("Debes agregar al menos un párrafo.")
        .defined(),
    correctAnswerIndex: number()
        .required("La fecha del evento es obligatoria.")
        .defined()
});

export function QuestionForm({
    updateID,
    formAction,
    formData,
    onSubmitSuccess,
    handleCloseSheet,
}: FormProps<QuestionType>) {
    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<QuestionFormValues>({
        defaultValues: {
            question: formAction ? formData?.question : "",
            catName: formAction ? formData?.catName : "",
            answers: formAction ? formData?.answers : [],
            correctAnswerIndex: formAction ? formData?.correctAnswerIndex : 0,
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const { toast } = useToast();
    const answers = useWatch({
        control,
        name: "answers",
        defaultValue: [],
    });
    const handleArrayChange = (
        fieldName: keyof QuestionFormValues,
        values: string[]
    ) => {
        setValue(fieldName, values, { shouldValidate: true });
    }

    const onSubmit: SubmitHandler<QuestionFormValues> = async (
            data: QuestionFormValues
        ) => {
            try {
                if (formAction && formData) {
                    await UpdateData({ path: "questions", data }, formData?.id);
                    console.log("Edit");
                } else {
                    await AddData({
                        path: "questions", data: {
                            ...data,
                        }
                    });
                    console.log("Add");
                }

                onSubmitSuccess();
                handleCloseSheet();
                toast({
                    variant: "success",
                    title: `¡Éxito!`,
                    description: `La pregunta "${data?.question}" fue ${formAction ? "editada" : "agregada"
                        } exitosamente.`,
                    duration: 1000
                });
            } catch (error) {
                console.log(error);
                toast({
                    variant: "destructive",
                    title: "¡Ocurrió un error!",
                    description: `Algo salió mal durante el proceso. Por favor, intente nuevamente. (${error})`,
                    duration: 1000
                });
            }
        };

    function handleLoadingText() {
        if (formAction) {
            return isSubmitting ? "Editando pregunta..." : "Editar pregunta";
        } else {
            return isSubmitting ? "Agregando pregunta..." : "Agregar pregunta";
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="mb-4">
                <label className="block text-gray-700">
                    Pregunta <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("question")}
                    type="text"
                    placeholder="Ingrese el nombre del evento (Ej: Fiesta de Verano)"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Nombre identificador del evento.",
                    errors?.question?.message!,
                    errors?.question!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Equipo <span className="font-bold text-red-800">*</span>
                </label>
                <Select
                    onValueChange={(value) =>
                        setValue("catName", value, { shouldValidate: true })
                    }
                    value={watch("catName")}
                    disabled={isSubmitting}
                >
                    <SelectTrigger className="w-full px-2 py-2 border rounded-lg focus:outline-green-800">
                        <SelectValue placeholder="Selecciona el equipo al que perteneces" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="AMBIENTAL">AMBIENTAL</SelectItem>
                        <SelectItem value="CULTURA">CULTURA</SelectItem>
                        <SelectItem value="HISTORIA">HISTORIA</SelectItem>
                        <SelectItem value="DEPORTES">DEPORTES</SelectItem>
                        <SelectItem value="BIOLOGIA">BIOLOGIA</SelectItem>
                    </SelectContent>
                </Select>
                {inputMessageHelper(
                    "Selecciona un equipo del listado",
                    errors?.catName?.message!,
                    errors?.catName!
                )}
            </div>
            <div className="mb-4">
                <MultiInput
                    type="textarea"
                    name="Respuestas"
                    values={answers}
                    onChange={(val) => handleArrayChange("answers", val)}
                />
                {inputMessageHelper(
                    <div className="flex flex-col gap-2 mt-2">
                        ESPECIFICACIONES:
                        <p>
                            1. Añade los párrafos completos que desarrollan la noticia.
                            <br />
                        </p>
                        <p>
                            {formAction &&
                                "2. En caso de querer editar el contenido de los párrafos se deben volver a ingresar los parrafos que se quieran mantener y las nuevas (manteniendo el mismo orden), sino dejar vacio este input en el formulario de edición"}
                        </p>
                    </div>,
                    errors?.answers?.message!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    ¿Cuantos días dura? <span className="font-bold text-red-800">*</span>
                </label>
                <Input
                    {...register("correctAnswerIndex")}
                    type="number"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                    min={0}
                    max={3}
                />
                {inputMessageHelper(
                    formAction
                        ? (
                            <div>
                                <p>Escribir que numero de pregunta es la correcta</p>
                            </div>
                        ) : "Elegir el número de la respuesta correcta exacto",
                    errors?.correctAnswerIndex?.message!,
                    errors?.correctAnswerIndex!
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
