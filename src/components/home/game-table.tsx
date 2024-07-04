"use client"
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { SlOptions } from "react-icons/sl";
import { GameTypes } from '@/types/GameTypes';

export function GameTable() {
    const { games } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);

    function onChangeOpen() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="border shadow-sm rounded-lg p-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead className="min-w-[150px]">Título</TableHead>
                        <TableHead className="hidden md:table-cell">Autor</TableHead>
                        <TableHead className="hidden md:table-cell">Tecnologías</TableHead>
                        <TableHead className="hidden md:table-cell">Estilo</TableHead>
                        <TableHead className="hidden md:table-cell">Género</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {games.map((game: GameTypes) => (
                        <TableRow key={game._id}>
                            <TableCell className="font-medium">{game._id}</TableCell>
                            <TableCell className="font-medium">{game.titulo}</TableCell>
                            <TableCell className="hidden md:table-cell">{game.autor}</TableCell>
                            <TableCell className="hidden md:table-cell">{game.tecnologias}</TableCell>
                            <TableCell className="hidden md:table-cell">{game.estilo}</TableCell>
                            <TableCell className="hidden md:table-cell">{game.genero}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <SlOptions className="w-4 h-4" />
                                            <span className="sr-only">Actions</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View</DropdownMenuItem>
                                        <DropdownMenuItem onClick={onChangeOpen}>Edit</DropdownMenuItem>
                                        <DropdownMenuItem>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogDescription>
                            {/* Descripción del diálogo */}
                        </DialogDescription>
                    </DialogHeader>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700">Fecha:</label>
                            <input type="date" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Hora:</label>
                            <input type="time" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Titulo:</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Descripcion:</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
