"use client";

import { useState } from "react";
import cx from "classnames";

import { FaInfoCircle } from "react-icons/fa";
import { IoIosWarning, IoIosCloseCircle } from "react-icons/io";
import { FilePreviewModal } from "./image-preview-modal";

interface FilesPreviewProps {
    files: Array<string>;
    handleFilesRemoved: (index: number) => void;
}

export function FilePreview({
    files,
    handleFilesRemoved,
}: FilesPreviewProps) {
    const NoFilesAddedInfo = () => (
        <div className="flex items-start flex-col gap-2 p-3 w-full rounded border-2 font-medium border-green-800 bg-green-100">
            <div className="flex items-center gap-2">
                <FaInfoCircle className="text-green-800 w-4 h-4" />
                <p>No se ha cargado ninguna imagen</p>
            </div>
            <div className="flex justify-start items-center gap-2">
                <IoIosWarning className="text-orange-500 w-5 h-5" />
                <p>Limite de Carga 4 imagenes</p>
            </div>
        </div>
    );

    const FileItem = ({ file, index }: { file: string; index: number }) => {
        const [isOpen, setIsOpen] = useState<boolean>(false);

        return (
            <div className="relative m-1">
                <div key={`${index}`} className="h-24 w-24">
                    <div className="relative">
                        <img
                            key={index}
                            src={file}
                            alt={`image ${index}`}
                            className="w-20 h-20 rounded-lg border-3 border-black"
                        />
                        <button
                            key={`button ${index}`}
                            onClick={() => handleFilesRemoved(index)}
                            className="absolute top-0 right-3 ml-2 -mt-1 text-red-600 rounded-full p-1"
                        >
                            <IoIosCloseCircle className="w-5 h-5" />
                        </button>
                    </div>
                    {isOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white p-5 rounded shadow-lg">
                                <button
                                    className="absolute top-2 right-2"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <IoIosCloseCircle className="w-5 h-5" />
                                </button>
                                <FilePreviewModal fileUri={file} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className={cx({
            "mt-3 grid grid-col-2 gap-4 px-12": Boolean(files.length > 0),
            "mt-3 flex flex-col items-center px-12": Boolean(files.length < 0)
        })}>
            {files.length > 0 ? (
                files.map((files, i) => (
                    <FileItem key={i} file={files} index={i} />
                ))
            ) : (
                <NoFilesAddedInfo />
            )}
        </div>
    );
}