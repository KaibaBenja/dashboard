"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
                        className="bg-green-800 hover:bg-green-700"
                    >
                        Editar
                    </Button>
                    <Button
                        className='bg-red-800 hover:bg-red-700'
                        onClick={() => {
                            takeCurrentId();
                            handleWarning(true);
                        }}
                    >
                        Borrar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
