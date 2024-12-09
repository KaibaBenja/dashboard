import React, { useRef } from 'react'
import { CiImageOn } from "react-icons/ci";
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';

interface FileInputProps {
    onImageSelected: (fileOrDataUrl: string | ArrayBuffer | null) => void;
}

const FileInput = ({ onImageSelected }: FileInputProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function (e) {
                onImageSelected(reader.result);
            }
        };
    }

    const onChooseImg = () => {
        inputRef.current?.click();
    }

    return (
        <Dialog>
            <DialogTrigger onClick={onChooseImg} className='mt-4 flex justify-center gap-2 items-center p-2 border-2 border-dotted hover:border-solid border-[#3c3c3c] font-medium hover:text-white rounded-lg w-full bg-transparent  hover:bg-green-700'>
                Elegir Imagen
                <CiImageOn />
            </DialogTrigger>
            <input type="file" accept='image/*' ref={inputRef} onChange={handleOnChange} className='hidden' />
        </Dialog>
    );
}

export default FileInput;

