import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ObjectSchema } from 'yup';

import { Button } from "../ui/button";

import { PostType } from "@/types/PostTypes";
import { FormProps } from "@/types/formProps";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { UpdateData } from "@/queries/UpdateData";
import { AddData } from "@/queries/AddData";
import { useToast } from "../ui/use-toast";

interface PostFormValues {
    fecha: string;
    titulo: string;
    categoria: string;
    pre_descripcion: string;
    descripcion: string;
    blog_images: string;
}

const schema: ObjectSchema<PostFormValues> = object({
    titulo: string()
        .required("El título es requerido")
        .defined(),
    fecha: string()
        .required("La fecha es requerida")
        .defined(),
    categoria: string()
        .required("La categoria es requerida")
        .defined(),
    pre_descripcion: string()
        .required("La Pre descripción es requerida")
        .defined(),
    descripcion: string()
        .required("La descripción es requerida")
        .defined(),
    blog_images: string()
        .required("La descripción es requerida")
        .defined(),
});

export function PostForm({ formAction, formData, onSubmitSuccess, handleCloseSheet }: FormProps<PostType>) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PostFormValues>({
        defaultValues: {
            titulo: formAction ? formData?.titulo : "",
            fecha: formAction ? formData?.fecha : "",
            categoria: formAction ? formData?.categoria : "",
            pre_descripcion: formAction ? formData?.pre_descripcion : "",
            descripcion: formAction ? formData?.descripcion : "",
            blog_images: "",
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const { toast } = useToast();

    const onSubmit: SubmitHandler<PostFormValues> = async (data: any) => {
        try {
            if (formAction && formData) {
                await UpdateData({path: "posts", data }, formData?._id);
                console.log("Edit");
            } else {
                await AddData({path: "posts", data });
                console.log("Add");
            }
            onSubmitSuccess();
            handleCloseSheet();
            toast({
                variant: "success",
                title: `Exito!`,
                description: `El Post ${data?.titulo} fue ${formAction ? "editado" : "agregado"}`,
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
                <label className="block text-gray-700">Título:</label>
                <input
                    {...register("titulo")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors.titulo && <p className="text-red-700 p-2 font-semibold">{errors.titulo.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Fecha:</label>
                <input
                    {...register("fecha")}
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors.fecha && <p className="text-red-700 p-2 font-semibold">{errors.fecha.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Categoria:</label>
                <input
                    {...register("categoria")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors.categoria && <p className="text-red-700 p-2 font-semibold">{errors.categoria.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Pre Descripción:</label>
                <input
                    {...register("pre_descripcion")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors.pre_descripcion && <p className="text-red-700 p-2 font-semibold">{errors.pre_descripcion.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Descripción:</label>
                <textarea
                    {...register("descripcion")}
                    rows={6}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors.descripcion && <p className="text-red-700 p-2 font-semibold">{errors.descripcion.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Imagen de Portada:</label>
                <input
                    {...register("blog_images")}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors.blog_images && <p className="text-red-700 p-2 font-semibold">{errors.blog_images.message}</p>}
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