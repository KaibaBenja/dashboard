"use client"

import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { SlOptions } from "react-icons/sl";
import { GameType } from '@/types/GameTypes';
import { deleteGame } from '@/queries/Games';
import { GameForm } from '../forms/game-form';
import Link from 'next/link';
import { SheetForm } from '../sheet-form';

export function GameTable() {
    const { games, setGames } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);


    function onChangeOpen() {
        setIsOpen(!isOpen);
    }

    async function handleDelete(gameId: number) {
        try {
            await deleteGame(gameId);
            setGames(prevGames => prevGames.filter(game => game._id !== gameId));
        } catch (error) {
            console.error('Failed to delete game:', error);
        }
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
                    {games.map((game: GameType) => (
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
                                        <Link className='relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' href={`/details/${game._id}`}>View</Link>
                                        <DropdownMenuItem onClick={onChangeOpen}>Edit</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDelete(game._id)}>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <SheetForm
                title='Formulario de Juego'
                descripcion='Ingresa los detalles de tu juego'
                isOpen={isOpen}
                handleOpen={onChangeOpen}
            >
                <GameForm />
            </SheetForm>
        </div>
    );
}
