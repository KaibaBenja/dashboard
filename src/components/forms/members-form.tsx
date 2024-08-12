    "use client";

    import { useForm, SubmitHandler } from "react-hook-form";
    import { yupResolver } from "@hookform/resolvers/yup";
    import { object, string, ObjectSchema } from 'yup';
    import { AddMembers, UpdateMembers } from "@/queries/Member";

    import { MemberType } from "@/types/MemberTypes";
    import { AiOutlineLoading3Quarters } from "react-icons/ai";
    import { Button } from "../ui/button";

    // import { FileUpload } from "../table-actions/custom-inputs/file-upload";
    import { FormProps } from "@/types/formProps";

    interface FormValues {
        name_surname: string;
        puesto: string;
        linkedIn: string;
        profile_pic: string;
    }

    const schema: ObjectSchema<FormValues> = object({
        name_surname: string()
            .required("El nombre es requerido")
            .test('is-string', 'El nombre debe ser una cadena de texto', value => typeof value === 'string')
            .defined(),
        puesto: string()
            .required("El puesto es requerido")
            .test('is-string', 'El puesto debe ser una cadena de texto', value => typeof value === 'string')
            .defined(),
        linkedIn: string()
            .required("Se debe ingresar un link valido de LinkedIn")
            .test('is-string', 'El link de LinkedIn debe ser una cadena de texto', value => typeof value === 'string'),
        profile_pic: string()
            .required("Se debe ingresar una foto de perfil")
            .test('is-string', 'La foto de perfil debe ser una cadena de texto', value => typeof value === 'string')
            .defined(),
    });

    export function MemberForm({ formAction, formData, onSubmitSuccess, handleCloseSheet }: FormProps<MemberType>) {
        const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
            defaultValues: {
                name_surname: formAction ? formData?.name_surname : "",
                puesto: formAction ? formData?.puesto : "",
                linkedIn: formAction ? formData?.linkedIn : "",
                profile_pic: formAction ? formData?.profile_pic : "",
            },
            resolver: yupResolver(schema),
            mode: "onChange",
        });

        // const [fileURLs, setFileURLs] = useState<string[]>(formAction && formData?.profile_pic ? [formData.profile_pic] : []);

        // const handleFilesSelected = (files: File[]) => {
        //     const newFileURLs = files.map((file) => URL.createObjectURL(file));
        //     setFileURLs(newFileURLs);
        //     setValue("profile_pic", newFileURLs[0], { shouldValidate: true });
        // };

        // const handleFileRemoved = () => {
        //     setFileURLs([]);
        //     setValue("profile_pic", "", { shouldValidate: true });
        // };

        const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
            try {
                if (formAction && formData) {
                    await UpdateMembers(formData._id, data);
                    console.log("Edit");
                } else {
                    await AddMembers(data);
                    console.log("Add");
                }
                onSubmitSuccess();
                handleCloseSheet();
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        

        function handleLoadingText() {
            if (formAction) {
                return isSubmitting ? "Editando Miembro" : "Editar Miembro";
            } else {
                return isSubmitting ? "Agregando Miembro" : "Agregar Miembro";
            }
        }

        return (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre:</label>
                    <input
                        {...register("name_surname")}
                        type="text"
                        placeholder="Nombre"
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
                        placeholder="Puesto"
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
                        placeholder="LinkedIn"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                        disabled={isSubmitting}
                    />
                    {errors?.linkedIn && <p className="text-red-700 p-2 font-semibold">{errors.linkedIn.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Foto de Perfil:</label>
                    <input
                        {...register("profile_pic")}
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                        disabled={isSubmitting}
                    />
                    {/* <FileUpload
                        files={fileURLs}
                        onFilesSelected={handleFilesSelected}
                        onFileRemoved={handleFileRemoved}
                        limit={1}
                    />   */}
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
