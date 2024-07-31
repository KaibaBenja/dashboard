import { AddMembers, UpdateMembers } from "@/queries/Member";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ObjectSchema } from 'yup';

import { Button } from "../ui/button";

import { MemberType } from "@/types/MemberTypes";

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

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        try {
            if (formAction && memberData) {
                UpdateMembers(memberData?._id);
                console.log("Edit");
            } else {
                // AddMembers();
                console.log("Add");
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} onDragEnter={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="mb-4">
                <label className="block text-gray-700">Nombre:</label>
                <input {...register("name_surname")} type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-green-800" />
                {errors?.name_surname && <p>{errors.name_surname.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Puesto:</label>
                <input {...register("puesto")} type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-green-800" />
                {errors?.puesto && <p>{errors.puesto.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">LinkedIn:</label>
                <input {...register("linkedIn")} type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-green-800" />
                {errors?.linkedIn && <p>{errors.linkedIn.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Perfil:</label>
                <input {...register("profile_pic")} type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-green-800" />
                {errors?.profile_pic && <p>{errors.profile_pic.message}</p>}
            </div>
            <div className="col-span-2 flex justify-end">
                <Button type="submit" className="mr-2 bg-green-800 w-full">Guardar</Button>
            </div>
        </form>
    );
}
