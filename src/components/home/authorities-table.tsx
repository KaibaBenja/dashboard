"use client"

import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { SlOptions } from "react-icons/sl";
import { deleteAuthority } from '@/queries/Authority';
import { SheetForm } from '../sheet-form';
import { AuthorityForm } from '../forms/authorities-form';
import { IoAddCircleSharp } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';

export function AuthorityTable() {
    const { authorities, setAuthorities } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);

    function onChangeOpen() {
        setIsOpen(!isOpen);
    }

    async function handleDelete(authoritieId: number) {
        try {
            await deleteAuthority(authoritieId);
            setAuthorities(prevAuthorities => prevAuthorities.filter(authoritie => authoritie._id !== authoritieId));
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
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead className="min-w-[150px]">Nombre</TableHead>
                            <TableHead className="hidden md:table-cell">Cargo</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {authorities.map((authoritie: { _id: number; name: string; puesto: string }) => (
                            <TableRow key={authoritie._id} className='flex flex-col md:flex-row md:table-row'>
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
                                            <DropdownMenuItem onClick={() => handleDelete(authoritie._id)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                                <TableCell className="flex md:table-cell items-center gap-2font-medium">
                                    <span className='block md:hidden'>Id: </span>{authoritie._id}</TableCell>
                                <TableCell className='flex md:table-cell items-center gap-2'>
                                    <span className='block md:hidden'>Nombre: </span>{authoritie.name}</TableCell>
                                <TableCell className="flex md:table-cell items-center gap-2">
                                    <span className='block md:hidden'>Puesto: </span>{authoritie.puesto}</TableCell>
                                <TableCell className="hidden md:block text-right">
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
                                            <DropdownMenuItem onClick={() => handleDelete(authoritie._id)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <SheetForm
                    title='Formulario de Autoridades'
                    descripcion='Ingresa la autoridad pertinente'
                    isOpen={isOpen}
                    handleOpen={onChangeOpen}
                >
                    <AuthorityForm />
                </SheetForm>
            </div>
        </div>
    )
}
