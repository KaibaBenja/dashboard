import { useState } from "react";
import Image from "next/image";
import cx from "classnames";
import { FaInfoCircle } from "react-icons/fa";
import { IoIosWarning, IoIosCloseCircle } from "react-icons/io";

interface FilesPreviewProps {
    files: Array<string>;
    handleFilesRemoved: (index: number) => void;
    limit_preview: number;
}

export function FilePreview({
    files,
    handleFilesRemoved,
    limit_preview,
}: FilesPreviewProps) {
    const NoFilesAddedInfo = () => (
        <div className="flex items-start flex-col gap-2 p-3 w-full rounded border-2 font-medium border-green-800 bg-green-100">
            <div className="flex items-center gap-2">
                <FaInfoCircle className="text-green-800 w-4 h-4" />
                <p>No se ha cargado ningún archivo</p>
            </div>
            {limit_preview < 10 && (
                <div className="flex justify-start items-center gap-2">
                    <IoIosWarning className="text-orange-500 w-5 h-5" />
                    <p>Limite de carga {limit_preview} archivos</p>
                </div>
            )}
        </div>
    );

    const FileItem = ({ file, index }: { file: string; index: number }) => {
        const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

        return (
            <div className="relative m-1">
                <div className="h-24 w-24">
                    <div className="relative">
                        <Image
                            src={file}
                            alt={`image ${index}`}
                            width={imageDimensions?.width || 100}
                            height={imageDimensions?.height || 100}
                            className="w-20 h-20 rounded-lg border-3 border-black"
                            onLoadingComplete={(img) => {
                                setImageDimensions({
                                    width: img.naturalWidth,
                                    height: img.naturalHeight,
                                });
                            }}
                        />
                        <button
                            onClick={() => handleFilesRemoved(index)}
                            className="absolute top-0 right-3 ml-2 -mt-1 text-red-600 hover:text-red-300 border bg-red-900 border-red-900 rounded-full"
                        >
                            <IoIosCloseCircle className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div
            className={cx({
                "mt-3 flex flex-wrap gap-4": files.length > 0,
                "mt-3 flex flex-col items-center": files.length === 0,
            })}
        >
            {files.length > 0 ? (
                files.map((file, i) => <FileItem key={i} file={file} index={i} />)
            ) : (
                <NoFilesAddedInfo />
            )}
        </div>
    );
}