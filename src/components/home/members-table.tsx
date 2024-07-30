"use client"

import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MemberType } from '@/types/MemberTypes';

import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { SlOptions } from "react-icons/sl";
import { deleteMember } from '@/queries/Member';
import { SheetForm } from '../sheet-form';
import { MemberForm } from '../forms/members-form';
import { IoAddCircleSharp } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';

export function MembersTable() {
    const { members, setMembers } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);

    function onChangeOpen() {
        setIsOpen(!isOpen);
    }


    async function handleDelete(memberId: number) {
        try {
            await deleteMember(memberId);
            setMembers(prevMembers => prevMembers.filter(member => member._id !== memberId));
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
                            <TableHead className="hidden md:table-cell">Puesto</TableHead>
                            <TableHead className="hidden md:table-cell">LinkedIn</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members.map((member: MemberType) => (
                            <TableRow key={member._id} className='flex flex-col md:flex-row md:table-row'>
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
                                            <DropdownMenuItem onClick={() => handleDelete(member._id)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                                <TableCell className="flex md:table-cell items-center gap-2 font-medium">
                                    <span className='block md:hidden'>Id: </span>{member._id}
                                </TableCell>
                                <TableCell className="flex md:table-cell items-center gap-2 font-medium">
                                    <span className='block md:hidden'>Nombre: </span>{member.name_surname}
                                </TableCell>
                                <TableCell className="flex md:table-cell items-center gap-2">
                                    <span className='block md:hidden'>Puesto: </span>{member.puesto}
                                </TableCell>
                                <TableCell className="flex md:table-cell items-center gap-2">
                                    <span className='block md:hidden'>LinkedIn: </span>{member.linkedIn}
                                </TableCell>
                                <TableCell className="hidden md:block   text-right">
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
                                            <DropdownMenuItem onClick={() => handleDelete(member._id)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <SheetForm
                    title='Formulario de Miembros'
                    descripcion='Ingresa los detalles del Miembro del equipo'
                    isOpen={isOpen}
                    handleOpen={onChangeOpen}
                >
                    <MemberForm />
                </SheetForm>
            </div>
        </div>
    )
}
