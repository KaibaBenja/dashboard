import { useRef, useEffect, useState } from "react";
import { FilePreview } from "./image-grid-preview";
import { LuUpload } from "react-icons/lu";
import { cx } from "class-variance-authority";
import { IoIosWarning } from "react-icons/io";

interface FileUploadProps {
    files: any;
    onFilesSelected: (files: any) => void;
    onFileRemoved: (index: number) => void;
    limit?: number;
    prev?: boolean;
}

export function FileUpload({
    files,
    onFilesSelected,
    onFileRemoved,
    limit = 5,
    prev = true
}: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

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
                showPrev={prev}
                files={files}
                limit_preview={limit}
                handleFilesRemoved={onFileRemoved}
            />
        </div>
    );
}
