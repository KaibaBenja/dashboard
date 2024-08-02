import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { TableCaption, TableCell } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { SlOptions } from "react-icons/sl";
import { MemberType } from "@/types/MemberTypes";
import { IoMdSettings } from "react-icons/io";

interface ActionCellProps {
    data: MemberType;
    closeDialog: boolean;
    index: string;
    handleCloseDialog: (close: boolean) => void;
    takeCurrentId: () => void;
    currentId: string;
    editActionCell: (data: MemberType) => void;
    deleteActionCell: (id: string) => Promise<void>;
}

export function ActionCell({
    data,
    index,
    closeDialog,
    handleCloseDialog,
    takeCurrentId,
    currentId,
    editActionCell,
    deleteActionCell
}: ActionCellProps) {
    return (
        <TableCell className="flex items-center justify-between text-right md:text-left">
            <TableCaption className="block md:hidden">{index}</TableCaption>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <IoMdSettings className="block md:hidden w-4 h-4" />
                        <SlOptions className="hidden md:block w-4 h-4" />
                        <span className="sr-only">Actions</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Ver</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => editActionCell(data)}>Editar</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                        takeCurrentId();
                        handleCloseDialog(true);
                    }}>
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
                <Dialog open={closeDialog} onOpenChange={() => handleCloseDialog(!closeDialog)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Borrar Miembro</DialogTitle>
                            <DialogDescription>
                                ¿Estás seguro? Los cambios son permanentes
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose>
                                <Button
                                    className='bg-gray-400 mt-6 hover:bg-gray-500'
                                    onClick={() => handleCloseDialog(false)}
                                >
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button
                                className='bg-red-800 mt-6 hover:bg-red-700'
                                onClick={async () => {
                                    if (currentId) {
                                        await deleteActionCell(currentId);
                                    }
                                    handleCloseDialog(false);
                                }}
                            >
                                Eliminar
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </DropdownMenu>
        </TableCell>
    );
}
