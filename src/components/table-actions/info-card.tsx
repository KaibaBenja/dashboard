import {
    Dialog,
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface InfoDialogProps {
    isOpen: boolean;
    handleOpen: () => void;
    children: React.ReactNode;
}

export function InfoDialog({ isOpen, handleOpen, children }: InfoDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={handleOpen}>
            <DialogContent className="sm:max-w-[425px] flex flex-col">
                {children}
                <DialogFooter className="mt-4 flex justify-around w-full">
                    <Button>Editar</Button>
                    <Button className="bg-red-800 hover:bg-red-700">Eliminar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
