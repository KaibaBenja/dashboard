import { DeleteWarning } from "./warning";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { TableCaption, TableCell } from "../ui/table";
import { SlOptions } from "react-icons/sl";
import { FaBookOpen, FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

interface ActionCellProps {
    data: any;
    closeWarning: boolean;
    index: string;
    handleCloseWarning: (close: boolean) => void;
    takeCurrentId: () => void;
    currentId: string;
    viewActionCell: (data: any) => void;
    editActionCell: (data: any) => void;
    deleteActionCell: (id: string) => Promise<void>;
}

export function QuestionsActionCell({
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
            <h1 className="block md:hidden">{index}</h1>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <IoMdSettings className="block md:hidden w-4 h-4" />
                        <SlOptions className="hidden md:block w-4 h-4" />
                        <span className="sr-only">Actions</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => viewActionCell(data)}
                        className="flex items-center gap-2 text-start font-semibold text-gray-800"
                    >
                        <FaBookOpen className="h-4 w-4 text-green-800" /> Vista
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => editActionCell(data)}
                        className="flex items-center gap-2 font-semibold text-gray-800"
                    >
                        <FaEdit className="h-4 w-4 text-green-800" /> Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            takeCurrentId();
                            handleCloseWarning(true);
                        }}
                        className="flex items-center gap-2 font-semibold text-gray-800"
                    >
                        <FaTrashAlt className="h-4 w-4 text-green-800" /> Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteWarning
                closeDialog={closeWarning && currentId === data.id}
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
