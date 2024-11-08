import Image from 'next/image';

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageCarouselCardProps {
    images: string[]
}

export function CarouselImage({
    images,
}: ImageCarouselCardProps) {

    return (
        <Card className="w-full  mx-auto mb-6">
            <CardContent className="p-6">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {images.map((src, index) => (
                            <CarouselItem key={index}>
                                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                                    <Image
                                        src={src}
                                        alt={`Gallery image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="absolute inset-0 flex items-center justify-between p-4">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </CardContent>
        </Card>
    )
}