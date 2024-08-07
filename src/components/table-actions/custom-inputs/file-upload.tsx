"use client";

import { useRef, useState, useEffect } from "react";
import { FilePreview } from "./image-grid-preview";
import { LuUpload } from "react-icons/lu";
import { cx } from "class-variance-authority";
import { IoIosWarning } from "react-icons/io";

interface FileUploadProps {
    limit?: number;
}

export function FileUpload({ limit = 4 }: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [files, setFiles] = useState<string[]>([]);
    const [uploadStatus, setUploadStatus] = useState<"select" | "uploading" | "done">("select");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const newFiles = Array.from(event.target.files);
            setSelectedFiles(newFiles);
            const newFileURLs = newFiles.map((file) => URL.createObjectURL(file));
            setFiles((prevFiles) => [...prevFiles, ...newFileURLs]);
        }
    };

    const onChooseFile = () => {
        inputRef.current?.click();
    };

    const clearFileInput = () => {
        if (inputRef.current) inputRef.current.value = "";
        setSelectedFiles([]);
        setUploadStatus("select");
    };

    const handleImageRemoved = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col items-center mt-2">
            <input
                ref={inputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
            />
            <button
                className={cx({
                    "w-80 h-36 text-lg font-medium flex flex-col items-center justify-center gap-2 mb-2 text-green-800 bg-white border-2 border-dashed border-green-700 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-100": files.length < limit,
                    "w-80 h-36 text-lg font-medium flex flex-col items-center justify-center gap-2 mb-2 text-orange-800 bg-white border-2 border-orange-700 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-100": files.length >= limit
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
                {files.length < limit ? "Cargar Archivos" : "Llegaste al limite"}
            </button>
            <FilePreview
                files={files}
                handleFilesRemoved={handleImageRemoved}
            />
        </div>
    );
}
