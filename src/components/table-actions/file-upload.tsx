import { useRef, useState } from "react";
import { LuUpload } from "react-icons/lu";

export function FileUpload() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [uploadStatus, setUploadStatus] = useState<"select" | "uploading" | "done">("select");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const onChooseFile = () => {
        inputRef.current?.click();
    };

    const clearFileInput = () => {
        if (inputRef.current) inputRef.current.value = "";
        setSelectedFile(null);
        setProgress(0);
        setUploadStatus("select");
    };

    const handleUpload = async () => {
        if (uploadStatus === "done") {
            clearFileInput();
            return;
        }

        setUploadStatus("uploading");

        setTimeout(() => {
            setProgress(100);
            setUploadStatus("done");
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center mt-2">
            <input
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
            />
            {!selectedFile && (
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
            {selectedFile && (
                <>
                    <div className="file-card w-72 flex items-center gap-4 text-black bg-white border border-gray-300 rounded-md p-4">
                        <span className="material-symbols-outlined text-2xl text-green-700">description</span>
                        <div className="file-info flex-1 flex items-center gap-4">
                            <div className="flex-1">
                                <h6 className="text-sm font-light">{selectedFile.name}</h6>
                                <div className="progress-bg w-full h-1.5 bg-gray-200 rounded-full mt-2">
                                    <div
                                        className="progress h-1.5 bg-green-700 rounded-full transition-all duration-500 ease-in-out"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                            {uploadStatus === "select" ? (
                                <button onClick={clearFileInput} className="file-info-button w-9 h-9 flex items-center justify-center text-sm text-green-700 bg-green-100 rounded-full">
                                    <span className="material-symbols-outlined text-lg">close</span>
                                </button>
                            ) : (
                                <div className="check-circle w-9 h-9 flex items-center justify-center text-sm text-green-700 bg-green-100 rounded-full">
                                    {uploadStatus === "uploading" ? (
                                        `${progress}%`
                                    ) : uploadStatus === "done" ? (
                                        <span className="material-symbols-outlined text-lg">check</span>
                                    ) : null}
                                </div>
                            )}
                        </div>
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
