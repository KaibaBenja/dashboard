import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

interface DeleteWarningProps {
    closeDialog: boolean;
    currentId: string;
    handleCloseDialog: (close: boolean) => void;
    deleteAction: (id: string) => void;
}

export function DeleteWarning({ closeDialog, handleCloseDialog, currentId, deleteAction }: DeleteWarningProps) {
    return (
        <Dialog open={closeDialog} onOpenChange={() => handleCloseDialog(!closeDialog)}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Eliminar elemento</DialogTitle>
                    <DialogDescription>
                        ¿Estás seguro? Los cambios son permanentes
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        className='bg-gray-400 mt-6 hover:bg-gray-500'
                        onClick={() => handleCloseDialog(false)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        className='bg-red-800 mt-6 hover:bg-red-700'
                        onClick={() => deleteAction(currentId)}
                    >
                        Eliminar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
