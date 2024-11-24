import { ScrollArea } from "../ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "../ui/sheet";


interface ModalFormProps {
    title: string;
    descripcion: string;
    isOpen: boolean;
    handleOpen: () => void;
    children: React.ReactNode;
}

export function SheetForm({ isOpen, handleOpen, title, descripcion, children }: ModalFormProps) {
    return (
        <Sheet
            open={isOpen}
            onOpenChange={handleOpen}
        >
            <SheetContent className="w-auto">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>
                        {descripcion}
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-full pb-20 mt-4">
                    {children}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}