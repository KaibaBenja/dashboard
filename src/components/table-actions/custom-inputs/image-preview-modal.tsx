export function ImagePreviewModal({ imageUri }: { imageUri: string }) {
    return (
        <div className="w-full bg-white p-4 rounded shadow-md">
            <div className="flex justify-center">
                <img
                    src={imageUri}
                    alt={`Image ${imageUri}`}
                    className="object-contain w-full h-96"
                />
            </div>
        </div>
    );
}
