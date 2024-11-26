"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ImageDialogProps {
    src: string
    alt: string
}

export function ImageDialog({ src, alt }: ImageDialogProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Image
                    src={src}
                    alt="gallery image trigger"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                />
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] max-h-screen p-0 overflow-hidden bg-transparent border-transparent">
                <div className="relative w-full h-full min-h-[50vh]">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        style={{ objectFit: 'contain' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}