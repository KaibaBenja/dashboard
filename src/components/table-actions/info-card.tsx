"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { FaEdit, FaTrashAlt } from "react-icons/fa";

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
    children,
    openCard,
    handleOpenCard,
    handleWarning,
    takeCurrentId,
    editActionCell,
}: InfoDialogProps) {
    const handleEdit = () => {
        editActionCell(data);
        handleOpenCard(false);
    };

    return (
        <Dialog open={openCard} onOpenChange={handleOpenCard}>
            <DialogContent className="no-scrollbar">
                <div className="grid gap-4 py-4">{children}</div>
                <DialogFooter>
                    <Button 
                        onClick={handleEdit} 
                        className="flex items-center gap-2 bg-green-800 hover:bg-green-700"
                    >
                        Editar <FaEdit className="w-4 h-4" />
                    </Button>
                    <Button
                        className='items-center gap-2 bg-red-800 hover:bg-red-700'
                        onClick={() => {
                            takeCurrentId();
                            handleWarning(true);
                        }}
                    >
                        Eliminar  <FaTrashAlt className="text-[#FFFFFF]"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
