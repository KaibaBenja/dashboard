import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ObjectSchema } from 'yup';
import { AddAuthorities, UpdateAuthorities } from "@/queries/Authority";

import { Button } from "../ui/button";

import { FormProps } from "@/types/formProps";
import { AuthoritieType } from "@/types/AuthTypes";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface AuthorityFormValues {
    name: string;
    puesto: string;
    profile_pic: string;
}

const schema: ObjectSchema<AuthorityFormValues> = object({
    name: string()
        .required("El nombre es requerido")
        .defined(),
    puesto: string()
        .required("El puesto es requerido")
        .defined(),
    profile_pic: string()
        .required("La imagen es requerida")
        .defined(),
});

export function AuthorityForm({ formAction, formData, onSubmitSuccess, handleCloseSheet }: FormProps<AuthoritieType>) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuthorityFormValues>({
        defaultValues: {
            name: formAction ? formData?.name : "",
            puesto: formAction ? formData?.puesto : "",
            profile_pic: formAction ? formData?.profile_pic : "",
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<AuthorityFormValues> = async (data: any) => {
        try {
            if (formAction && formData) {
                await UpdateAuthorities(formData?._id, data);
                console.log("Edit");
            } else {
                await AddAuthorities(data);
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
            return isSubmitting ? "Editando Autoridad" : "Editar Autoridad";
        } else {
            return isSubmitting ? "Agregando Autoridad" : "Agregar Autoridad";
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="mb-4">
                <label className="block text-gray-700">Nombre:</label>
                <input
                    {...register("name")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors.name && <p className="text-red-700 p-2 font-semibold">{errors?.name?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Puesto:</label>
                <input
                    {...register("puesto")}
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.puesto && <p className="text-red-700 p-2 font-semibold">{errors?.puesto?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Categoria:</label>
                <input
                    {...register("profile_pic")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.profile_pic && <p className="text-red-700 p-2 font-semibold">{errors?.profile_pic?.message}</p>}
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