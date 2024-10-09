import {
    Dialog,
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { DeleteWarning } from "./warning";

interface InfoDialogProps {
    data: any;
    children: React.ReactNode;
    openCard: boolean;
    openWarning: boolean;
    handleOpenCard: (close: boolean) => void;
    handleWarning: (close: boolean) => void;
    currentId: string;
    takeCurrentId: () => void;
    editActionCell: (data: any) => void;
    deleteActionCell: (id: string) => Promise<void>;
}

export function InfoDialog({
    data,
    openCard,
    handleOpenCard,
    openWarning,
    handleWarning,
    children,
    takeCurrentId,
    currentId,
    editActionCell,
    deleteActionCell
}: InfoDialogProps) {
    return (
        <Dialog open={openCard} onOpenChange={handleOpenCard}>
            <DialogContent className="w-full mx-4 flex flex-col justify-center no-scrollbar">
                {children}
                <DialogFooter className="mt-4 flex justify-around w-full">
                    <Button onClick={() => editActionCell(data!)}>Editar</Button>
                    <Button className="bg-red-800 hover:bg-red-700" onClick={() => {
                        takeCurrentId();
                        handleWarning(true);
                    }}>Eliminar</Button>
                </DialogFooter>
            </DialogContent>
            <DeleteWarning
                closeDialog={openWarning && currentId === data?._id}
                currentId={currentId}
                handleCloseDialog={handleWarning}
                deleteAction={async () => {
                    if (currentId) {
                        await deleteActionCell(currentId);
                    }
                    await handleWarning(false);
                    await handleOpenCard(false);
                }}
            />
        </Dialog>
    )
}
