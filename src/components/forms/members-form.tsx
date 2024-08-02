import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ObjectSchema } from 'yup';
import { AddMembers, UpdateMembers } from "@/queries/Member";

import { MemberType } from "@/types/MemberTypes";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "../ui/button";

interface MemberFormProps {
    formAction: boolean;
    memberData: MemberType | null;
}

interface FormValues {
    name_surname: string;
    puesto: string;
    linkedIn: string;
    profile_pic: string;
};

const schema: ObjectSchema<FormValues> = object({
    name_surname: string().required("El nombre es requerido").defined(),
    puesto: string().required("El puesto es requerido").defined(),
    linkedIn: string().required("Se debe ingresar un link valido de linkedIn"),
    profile_pic: string().required("Se debe ingresar una foto de perfil").defined(),
});

export function MemberForm({ formAction, memberData }: MemberFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: {
            name_surname: formAction ? memberData?.name_surname : "",
            puesto: formAction ? memberData?.puesto : "",
            linkedIn: formAction ? memberData?.linkedIn : "",
            profile_pic: formAction ? memberData?.profile_pic : "",
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
        try {
            if (formAction && memberData) {
                await UpdateMembers(memberData?._id, data);
                console.log("Edit");
            } else {
                await AddMembers(data);
                console.log("Add");
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    function handleLoadingText() {
        if (formAction) {
            if (isSubmitting) {
                return "Editar Miembro";
            } else {
                return "Editando Miembro";
            }
        } else {
            if (isSubmitting) {
                return "Agregar Miembro";
            } else {
                return "Agregando Miembro";
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="mb-4">
                <label className="block text-gray-700">Nombre:</label>
                <input
                    {...register("name_surname")}
                    type="text"
                    placeholder={formAction ? memberData?.name_surname : ""}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.name_surname && <p className="text-red-700 p-2 font-semibold">{errors.name_surname.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Puesto:</label>
                <input
                    {...register("puesto")}
                    type="text"
                    placeholder={formAction ? memberData?.puesto : ""}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.puesto && <p className="text-red-700 p-2 font-semibold">{errors.puesto.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">LinkedIn:</label>
                <input
                    {...register("linkedIn")}
                    type="text"
                    placeholder={formAction ? memberData?.linkedIn : ""}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.linkedIn && <p className="text-red-700 p-2 font-semibold">{errors.linkedIn.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Perfil:</label>
                <input
                    {...register("profile_pic")}
                    type="text"
                    placeholder={formAction ? memberData?.profile_pic : ""}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {errors?.profile_pic && <p className="text-red-700 p-2 font-semibold">{errors.profile_pic.message}</p>}
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
