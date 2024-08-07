export function FilePreviewModal({ fileUri }: { fileUri: string }) {
    return (
        <div className="w-full bg-white p-4 rounded shadow-md">
            <div className="flex justify-center">
                <img
                    src={fileUri}
                    alt={`Image ${fileUri}`}
                    className="object-contain w-full h-96"
                />
            </div>
        </div>
    );
}
