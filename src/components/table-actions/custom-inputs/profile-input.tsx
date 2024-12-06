import React, { useRef } from 'react'
import { Button } from '../../ui/button';
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
            <DialogTrigger>
                <Button onClick={onChooseImg} type='button' className='mt-5 bg-green-800 hover:bg-green-700'>Elegir Imagen</Button>
            </DialogTrigger>
            <input type="file" accept='image/*' ref={inputRef} onChange={handleOnChange} className='hidden' />
        </Dialog>
    );
}

export default FileInput;

