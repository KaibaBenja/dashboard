"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ObjectSchema, number, boolean, array } from "yup";

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
import { FetchAllData } from "@/queries/FetchAllData";

interface QuestionFormValues {
    question: string;
    catName: string;
    answers: string[];
    correctAnswerIndex: number;

}

const schema: ObjectSchema<QuestionFormValues> = object({
    question: string()
        .required("La pregunta es obligatoria.")
        .defined(),
    catName: string()
        .required("La categoría de la pregunta es obligatoria.")
        .defined(),
    answers: array()
        .of(string().required("Cada respuesta es obligatoria."))
        .min(4, "Debe haber exactamente 4 respuestas.")
        .max(4, "Debe haber exactamente 4 respuestas.")
        .required("Debes agregar 4 respuestas.")
        .defined(),
    correctAnswerIndex: number()
        .required("El índice de la pregunta correcta es obligatorio.")
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
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        async function loadCategories() {
            try {
                const updateQuestions = await FetchAllData("questions/categories");
                setCategories(updateQuestions);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
                setLoading(false);
            }
        }
        loadCategories();
    }, []);

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
                    placeholder="Ejemplo: ¿Cuál es la capital de Francia?"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper(
                    "Ingresar Pregunta.",
                    errors?.question?.message!,
                    errors?.question!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Categoría <span className="font-bold text-red-800">*</span>
                </label>
                <Select
                    onValueChange={(value) =>
                        setValue("catName", value, { shouldValidate: true })
                    }
                    value={watch("catName")}
                    disabled={isSubmitting}
                >
                    <SelectTrigger className="w-full px-2 py-2 border rounded-lg focus:outline-green-800">
                        <SelectValue placeholder="Selecciona la categoría" />
                    </SelectTrigger>
                    <SelectContent>
                        {loading ? (
                            <SelectItem value="loading" disabled>
                                Cargando categorías...
                            </SelectItem>
                        ) : (
                            categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))
                        )}
                    </SelectContent>
                </Select>
                {inputMessageHelper(
                    "Selecciona una categoría del listado",
                    errors?.catName?.message!,
                    errors?.catName!
                )}
            </div>
            <div className="mb-4">
                <MultiInput
                    type="textarea"
                    name="Respuestas"
                    values={answers}
                    onChange={(val) => {
                        if (val.length <= 4) {
                            handleArrayChange("answers", val);
                        }

                    }}
                />
                {errors?.answers && (
                    <p className="text-red-500 mt-2">{errors.answers.message}</p>
                )}
                {inputMessageHelper(
                    <div className="flex flex-col gap-2 mt-2">
                        ESPECIFICACIONES:
                        <p>
                            1. Añade las respuestas para las preguntas
                            <br />
                        </p>
                        <p>
                            {formAction &&
                                "2. Coloque correctamente las respuestas"}
                        </p>
                    </div>,
                    errors?.answers?.message!
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    ¿Indice de respuesta correcta? <span className="font-bold text-red-800">*</span>
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
