import { useRef, useEffect, useState } from "react";
import { FilePreview } from "./image-grid-preview";
import { LuUpload } from "react-icons/lu";
import { cx } from "class-variance-authority";
import { IoIosWarning } from "react-icons/io";

interface FileUploadProps {
    files: File[];
    onFilesSelected: (files: File[]) => void;
    onFileRemoved: (index: number) => void;
    limit?: number;
}

export function FileUpload({
    files,
    onFilesSelected,
    onFileRemoved,
    limit = 5,
}: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileUrls, setFileUrls] = useState<string[]>([]);

    const onChooseFile = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.target.files && event.target.files.length > 0) {
            const newFiles = Array.from(event.target.files).slice(0, limit - files.length);
            onFilesSelected(newFiles);
        }
    };

    useEffect(() => {
        // Convertimos archivos a URLs y actualizamos el estado de `fileUrls`
        const urls = files.map((file) => URL.createObjectURL(file));
        setFileUrls(urls);

        // Limpiamos las URLs cuando el componente se desmonta
        return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }, [files]);

    return (
        <div className="flex flex-col mt-2">
            <input
                ref={inputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
            />
            <button
                type="button"
                className={cx({
                    "w-full h-36 text-lg font-medium flex flex-col items-center justify-center gap-2 mb-2 text-green-800 bg-white border-2 border-dashed border-green-700 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-100": files.length < limit,
                    "w-full h-36 text-lg font-medium flex flex-col items-center justify-center gap-2 mb-2 text-orange-800 bg-white border-2 border-orange-700 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-100": files.length >= limit
                })}
                onClick={onChooseFile}
                disabled={files.length >= limit}
            >
                <span className={cx({
                    "bg-gray-100 p-3 rounded-full": files.length < limit,
                    "bg-orange-100 p-3 rounded-full": files.length >= limit
                })}>
                    {files.length < limit ? <LuUpload /> : <IoIosWarning />}
                </span>
                {files.length < limit ? "Cargar Archivos" : "Llegaste al límite"}
            </button>
            <FilePreview
                files={fileUrls}
                limit_preview={limit}
                handleFilesRemoved={onFileRemoved}
            />
        </div>
    );
}
