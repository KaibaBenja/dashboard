"use client";

import { useState } from "react";

import { ImagePreviewModal } from "./image-preview-modal";

import { FaInfoCircle } from "react-icons/fa";
import { IoIosWarning, IoIosCloseCircle } from "react-icons/io";

interface ImagesPreviewProps {
    images: Array<string>;
    handleImageRemoved: (index: number) => void;
}

export function ImagesPreview({
    images,
    handleImageRemoved,
}: ImagesPreviewProps) {
    const NoImagesAddedInfo = () => (
        <div className="flex flex-row p-3 w-full lg:w-52 xl:w-72 rounded border-2 border-info-400 bg-info-100">
            <FaInfoCircle className="text-info-600 w-5 h-5" />
            <p>No se ha cargado ninguna imagen.</p>
        </div>
    );

    const LimitImagesExceeded = () => (
        <div className="flex flex-row p-3 w-full lg:w-52 xl:w-72 rounded border-2 border-warning-400 bg-warning-100">
            <IoIosWarning className="text-warning-600 w-5 h-5" />
            <p>Has pasado las 4 imágenes permitidas</p>
        </div>
    );

    const ImageItem = ({ image, index }: { image: string; index: number }) => {
        const [isOpen, setIsOpen] = useState<boolean>(false);

        return (
            <div className="relative m-1">
                <div key={`${index}`} className="h-24 w-24">
                    <div className="relative">
                        <img
                            key={index}
                            src={image}
                            alt={`image ${index}`}
                            className="w-20 h-20 rounded-lg border-3 border-black"
                        />
                        <button
                            key={`button ${index}`}
                            onClick={() => handleImageRemoved(index)}
                            className="absolute top-0 right-0 mt-1 mr-1 bg-red-600 text-white rounded-full p-1"
                        >
                            <IoIosCloseCircle className="w-3 h-3" />
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
                                <ImagePreviewModal imageUri={image} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full mt-3 flex flex-wrap space-y-3 bg-pink-500">
            {images.length > 0 ? (
                images.map((image, i) => (
                    <ImageItem key={i} image={image} index={i} />
                ))
            ) : (
                <NoImagesAddedInfo />
            )}
            {images.length > 4 && <LimitImagesExceeded />}
        </div>
    );
}