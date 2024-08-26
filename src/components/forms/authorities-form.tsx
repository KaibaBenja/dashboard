import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ObjectSchema } from 'yup';

import { Button } from "../ui/button";

import { FormProps } from "@/types/formProps";
import { AuthoritieType } from "@/types/AuthTypes";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { UpdateData } from "@/queries/UpdateData";
import { AddData } from "@/queries/AddData";
import { useToast } from "../ui/use-toast";
import { StaticImageData } from "next/image";

interface AuthorityFormValues {
    name: string;
    puesto: string;
    profile_pic: string | string[] | StaticImageData[];
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
    const { toast } = useToast();

    const onSubmit: SubmitHandler<AuthorityFormValues> = async (data: any) => {
        try {
            if (formAction && formData) {
                await UpdateData({path: "authorities", data },formData?._id);
                console.log("Edit");
            } else {
                await AddData({path: "authorities", data });
                console.log("Add");
            }
            onSubmitSuccess();
            handleCloseSheet();
            toast({
                variant: "success",
                title: `Exito!`,
                description: `La Autoridad ${data?.name} fue ${formAction ? "editada" : "agregada"}`,
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
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.puesto && <p className="text-red-700 p-2 font-semibold">{errors?.puesto?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Foto de Perfil:</label>
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