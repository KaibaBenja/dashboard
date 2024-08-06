import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { TableCaption, TableCell } from "../ui/table";
import { SlOptions } from "react-icons/sl";
import { MemberType } from "@/types/MemberTypes";
import { IoMdSettings } from "react-icons/io";
import { DeleteWarning } from "./warning";

interface ActionCellProps {
    data: MemberType;
    closeWarning: boolean;
    index: string;
    handleCloseWarning: (close: boolean) => void;
    takeCurrentId: () => void;
    currentId: string;
    viewActionCell: (data: MemberType) => void;
    editActionCell: (data: MemberType) => void;
    deleteActionCell: (id: string) => Promise<void>;
}

export function ActionCell({
    data,
    index,
    closeWarning,
    handleCloseWarning,
    takeCurrentId,
    currentId,
    viewActionCell,
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
                    <DropdownMenuItem onClick={() => viewActionCell(data)}>Ver</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => editActionCell(data)}>Editar</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                        takeCurrentId();
                        handleCloseWarning(true);
                    }}>
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteWarning
                closeDialog={closeWarning && currentId === data._id}
                currentId={currentId}
                handleCloseDialog={handleCloseWarning}
                deleteAction={async () => {
                    if (currentId) {
                        await deleteActionCell(currentId);
                    }
                    handleCloseWarning(false);
                }}
            />
        </TableCell>
    );
}
