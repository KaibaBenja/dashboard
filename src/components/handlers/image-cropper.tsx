import React, { useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';

interface ImageCropperProps {
    image: any,
    onCropDone: any,
    onCropCancel: any,
}


const ImageCropper = ({ image, onCropDone, onCropCancel }: ImageCropperProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setzoom] = useState(2);
    const [shape, setShape] = useState<'round' | 'rect' | undefined>('round');

    const [croppedArea, setCroppedArea] = useState<Area>();
    const [aspectRatio, setAspectRatio] = useState(1 / 1);
    const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
        setCroppedArea(croppedAreaPixels)
    }
    const handleAspectRatioChange = (value: string) => {
        const ratio = eval(value);
        setAspectRatio(ratio);
    };

    const handleShapeChange = (value: 'round' | 'rect' | undefined) => {
        setShape(value);
    };

    return (
        <div className='container flex items-end justify-center'>
            <Cropper image={image}
                aspect={aspectRatio}
                crop={crop}
                zoom={zoom}
                onCropChange={setCrop}
                onZoomChange={setzoom}
                onCropComplete={onCropComplete}
                cropShape={shape}

                style={{
                    containerStyle: {
                        width: '100%',
                        height: '65%',
                        backgroundColor: "fff",
                    },
                }} />

            <div className='flex flex-col items-center justify-center gap-2'>
                <div className='flex gap-2 items-center justify-around'>
                    <div >
                        <Select onValueChange={handleAspectRatioChange}>
                            <SelectTrigger className='w-[150px]'>
                                <SelectValue placeholder="Formato" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup >
                                    <SelectLabel>Formatos</SelectLabel>
                                    <SelectItem value="1 / 1">1:1</SelectItem>
                                    <SelectItem value="5 / 4">5:4</SelectItem>
                                    <SelectItem value="4 / 3">4:3</SelectItem>
                                    <SelectItem value="3 / 2">3:2</SelectItem>
                                    <SelectItem value="5 / 3">5:3</SelectItem>
                                    <SelectItem value="16 / 9">16:9</SelectItem>
                                    <SelectItem value="3 / 1">3:1</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex gap-2  items-center'>
                        <Button onClick={() => handleShapeChange('round')} className='bg-green-800 hover:bg-green-700' >Circular</Button>
                        <Button onClick={() => handleShapeChange('rect')} className='bg-green-800 hover:bg-green-700'>Cuadrada</Button>
                    </div>
                </div>
                <div className='flex items-center gap-3 mt-5'>
                    <Button onClick={onCropCancel} className='bg-green-800 hover:bg-green-700'>Cancelar</Button>
                    <Button onClick={() => onCropDone(croppedArea)} className='bg-green-800 hover:bg-green-700'>Recortar</Button>
                </div>
            </div>



        </div>
    )
}

export default ImageCropper
