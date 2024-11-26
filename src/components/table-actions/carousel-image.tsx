import Image from 'next/image';

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageDialog } from './image-modal';

interface ImageCarouselCardProps {
    images: string[]
}

export function CarouselImage({
    images,
}: ImageCarouselCardProps) {
    if (!images) return null;

    return (
        <Card className="w-full max-w-[1125px] mx-auto mb-6">
            <CardContent className="p-4">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {images.map((src, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                                    <ImageDialog
                                        src={src}
                                        alt={`Gallery image ${index + 1}`}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between p-4 pointer-events-none">
                        <CarouselPrevious className="pointer-events-auto" />
                        <CarouselNext className="pointer-events-auto" />
                    </div>
                </Carousel>
            </CardContent>
        </Card>
    )
}