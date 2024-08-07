import { useRef, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { LuUpload } from "react-icons/lu";

export function FileUpload() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [uploadStatus, setUploadStatus] = useState<"select" | "uploading" | "done">("select");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const files = Array.from(event.target.files);
            setSelectedFiles(files);
            const newImages = files.map((file) => URL.createObjectURL(file));
            setImages((prevImages) => [...prevImages, ...newImages]);
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

    const handleUpload = async () => {
        if (uploadStatus === "done") {
            clearFileInput();
            return;
        }

        setUploadStatus("uploading");

        setTimeout(() => {
            setUploadStatus("done");
        }, 1000);
    };

    const handleImageRemoved = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
            {!selectedFiles.length && (
                <button
                    className="file-btn w-80 h-36 text-lg font-medium flex flex-col items-center justify-center gap-2 text-green-800 bg-white border-2 border-dashed border-green-700 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-100"
                    onClick={onChooseFile}
                >
                    <span className="bg-slate-100 p-3 rounded-full">
                        <LuUpload />
                    </span>
                    Upload File
                </button>
            )}
            {selectedFiles.length > 0 && (
                <>
                    <div className="w-full flex flex-wrap gap-2">
                        {images.map((image, index) => (
                            <div key={index} className="relative w-24 h-24">
                                <img src={image} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-lg" />
                                <button
                                    onClick={() => handleImageRemoved(index)}
                                    className="absolute top-0 right-0 mt-1 mr-1 bg-red-600 text-white rounded-full p-1"
                                >
                                    <IoIosCloseCircle className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        className="upload-btn w-80 text-sm font-medium text-white bg-green-700 rounded-md py-2 mt-4 cursor-pointer"
                        onClick={handleUpload}
                    >
                        {uploadStatus === "select" || uploadStatus === 'uploading' ? "Upload" : "Done"}
                    </button>
                </>
            )}
        </div>
    );
}
