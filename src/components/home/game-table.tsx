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
import { IoAddCircleSharp } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';

export function GameTable() {
    const { games, setGames } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);


    function onChangeOpen() {
        setIsOpen(!isOpen);
    }

    async function handleDelete(gameId: string) {
        try {
            await deleteGame(gameId);
            setGames(prevGames => prevGames.filter(game => game._id !== gameId));
        } catch (error) {
            console.error('Failed to delete game:', error);
        }
    }

    return (
        <div className='flex flex-col'>
            <button className="flex items-center self-end gap-2 text-[#FFFFFF] rounded-lg px-4 py-2 mb-4 bg-green-800 hover:bg-green-700" onClick={onChangeOpen}>
                <IoAddCircleSharp className="w-5 h-5" /> Agregar
            </button>
            <div className="border shadow-sm rounded-lg p-2">
                <Table>
                    <TableHeader className='border-b hidden md:table-header-group'>
                        <TableRow className='border-b'>
                            <TableHead className="table-cell w-[100px]">ID</TableHead>
                            <TableHead className="table-cell min-w-[150px]">Título</TableHead>
                            <TableHead className='table-cell'>Autor</TableHead>
                            <TableHead className='table-cell'>Tecnologías</TableHead>
                            <TableHead className='table-cell'>Estilo</TableHead>
                            <TableHead className='hidden lg:table-cell'>Género</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {games.map((game: GameType) => (
                            <TableRow key={game._id} className='flex flex-col md:flex-row md:table-row'>
                                <TableCell className="block md:hidden text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <IoMdSettings className="w-4 h-4" />
                                                <span className="sr-only">Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View</DropdownMenuItem>
                                            <DropdownMenuItem onClick={onChangeOpen}>Edit</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDelete(game?._id)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                                <TableCell className="flex md:table-cell items-center gap-2 font-medium">
                                    <span className='block md:hidden'>Id:</span>{game._id}
                                </TableCell>
                                <TableCell className="flex md:table-cell items-center gap-2 font-medium">
                                    <span className='block md:hidden'>Titulo:</span>{game.titulo}
                                </TableCell>
                                <TableCell className="flex md:table-cell items-center gap-2">
                                    <span className='block md:hidden'>Autor:</span>{game.autor}
                                </TableCell>
                                <TableCell className="flex md:table-cell items-center gap-2">
                                    <span className='block md:hidden'>Tecnologias:</span>{game.tecnologias}
                                </TableCell>
                                <TableCell className="flex md:table-cell items-center gap-2">
                                    <span className='block md:hidden'>Estilo:</span>{game.estilo}
                                </TableCell>
                                <TableCell className="flex md:hidden lg:table-cell items-center gap-2">
                                    <span className='block md:hidden'>Genero:</span>{game.genero}
                                </TableCell>
                                <TableCell className="hidden md:block text-right">
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
        </div>
    );
}
