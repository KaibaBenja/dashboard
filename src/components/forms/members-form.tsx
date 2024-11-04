import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { StaticImageData } from "next/image";
import { UpdateData } from "@/queries/UpdateData";
import { AddData } from "@/queries/AddData";
import { object, string, ObjectSchema, mixed } from 'yup';
import { MemberType } from "@/types/MemberTypes";
import { FormProps } from "@/types/formProps";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";
import { FileUpload } from "../table-actions/custom-inputs/file-upload";
import { inputMessageHelper } from "../handlers/input-helper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface FormValues {
    name_surname: string;
    team: string;
    puesto: string;
    linkedIn: string;
    profile_pic: string | File | StaticImageData;
}

const schema: ObjectSchema<FormValues> = object({
    name_surname: string()
        .required("El nombre es requerido")
        .test('is-string', 'El nombre debe ser una cadena de texto', value => typeof value === 'string')
        .defined(),
    team: string()
        .required("El Team es requerido")
        .defined(),
    puesto: string()
        .required("El puesto es requerido")
        .test('is-string', 'El puesto debe ser una cadena de texto', value => typeof value === 'string')
        .defined(),
    linkedIn: string()
        .required("Se debe ingresar un link valido de LinkedIn")
        .test('is-string', 'El link de LinkedIn debe ser una cadena de texto', value => typeof value === 'string'),
    profile_pic: mixed<string | File | StaticImageData>()
        .required("Se debe ingresar una foto de perfil")
        .test('is-valid-type', 'El archivo de imagen debe ser un tipo válido', value =>
            typeof value === 'string' || value instanceof File || (value && typeof value === 'object')
        )
        .defined(),
});

export function MemberForm({ updateID, formAction, formData, onSubmitSuccess, handleCloseSheet }: FormProps<MemberType>) {
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormValues>({
        defaultValues: {
            name_surname: formAction ? formData?.name_surname : "",
            team: formAction ? formData?.team : "",
            puesto: formAction ? formData?.puesto : "",
            linkedIn: formAction ? formData?.linkedIn : "",
            profile_pic: formAction ? formData?.profile_pic : "",
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const { toast } = useToast();

    const [fileURLs, setFileURLs] = useState<any>([]);

    const handleFilesSelected = (files: File[]) => {
        if (files.length > 0) {
            const newFileURLs = files.map((file) => URL.createObjectURL(file));
            setFileURLs(newFileURLs);
            setValue("profile_pic", files[0], { shouldValidate: true, shouldTouch: true });
            event?.preventDefault();
        }
    };

    const handleFileRemoved = () => {
        setFileURLs([]);
        setValue("profile_pic", "", { shouldValidate: true });
    };

    const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
        try {
            const formData = new FormData();
            formData.append("name_surname", data.name_surname);
            formData.append("team", data.team);
            formData.append("puesto", data.puesto);
            formData.append("linkedIn", data.linkedIn);

            if (data.profile_pic instanceof File) {
                formData.append("profile_pic", data.profile_pic);
            }

            if (formAction) {
                await UpdateData({ path: "members", data: formData }, updateID!);
            } else {
                await AddData({ path: "members", data: formData });
            }

            onSubmitSuccess();
            handleCloseSheet();
            toast({
                variant: "success",
                title: `Éxito!`,
                description: `El miembro ${data.name_surname} fue ${formAction ? "editado" : "agregado"}`,
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Ocurrió un Error!",
                description: "Fallo algo durante el proceso, pruebe de nuevo",
            });
        }
    };

    const handleLoadingText = () => {
        return isSubmitting 
            ? (formAction ? "Editando Miembro" : "Agregando Miembro") 
            : (formAction ? "Editar Miembro" : "Agregar Miembro");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="mb-4">
                <label className="block text-gray-700">
                    Nombre y apellido <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("name_surname")}
                    type="text"
                    placeholder="Nombre Completo"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("", errors?.name_surname?.message!, errors?.name_surname!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Equipo <span className="font-bold text-red-800">*</span>
                </label>
                <Select
                    onValueChange={(value) => setValue("team", value, { shouldValidate: true })}
                    value={watch("team")}
                    disabled={isSubmitting}
                >
                    <SelectTrigger className="w-full px-2 py-2 border rounded-lg focus:outline-green-800">
                        <SelectValue placeholder="¿A qué equipo pertenece?" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Desarrolladores">Desarrolladores</SelectItem>
                        <SelectItem value="Comunicación">Comunicación</SelectItem>
                        <SelectItem value="Diseño">Diseñadores</SelectItem>
                        <SelectItem value="Impresiones 3D">Impresiones 3D</SelectItem>
                        <SelectItem value="Logística y Soporte">Logística y Soporte</SelectItem>
                    </SelectContent>
                </Select>
                {inputMessageHelper("", errors?.team?.message!, errors?.team!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Puesto <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("puesto")}
                    type="text"
                    placeholder="Puesto de trabajo"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("", errors?.puesto?.message!, errors?.puesto!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    LinkedIn <span className="font-bold text-red-800">*</span>
                </label>
                <input
                    {...register("linkedIn")}
                    type="text"
                    placeholder="Link de LinkedIn del miembro"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-green-800"
                    disabled={isSubmitting}
                />
                {inputMessageHelper("Si el usuario no tiene LinkedIn, poner null", errors?.linkedIn?.message!, errors?.linkedIn!)}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Foto de Perfil <span className="font-bold text-red-800">*</span>
                </label>
                <FileUpload
                    {...register("profile_pic")}
                    files={fileURLs}
                    onFilesSelected={handleFilesSelected}
                    onFileRemoved={handleFileRemoved}
                    limit={1}
                />
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