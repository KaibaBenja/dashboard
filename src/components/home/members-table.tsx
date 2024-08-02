"use client";

import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { deleteMember } from '@/queries/Member';

import { MemberType } from '@/types/MemberTypes';

import { MemberForm } from '../forms/members-form';
import { ActionCell } from '../actions-cell';
import { SheetForm } from '../sheet-form';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { IoAddCircleSharp } from 'react-icons/io5';

export function MembersTable() {
    const { members, setMembers } = useAppContext();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [warning, setWarning] = useState<boolean>(false);
    const [currentMemberId, setCurrentMemberId] = useState<string>("");
    const [actionForm, setActionForm] = useState<boolean>(false);
    const [currentMember, setCurrentMember] = useState<MemberType | null>(null);

    function onAddClick() {
        setIsOpen(true);
        setActionForm(false);
        setCurrentMember(null);
    }

    function onEditClick(member: MemberType) {
        setIsOpen(true);
        setActionForm(true);
        setCurrentMember(member);
    }

    function handleWarning() {
        setWarning(!warning);
    }

    function handleCloseForm() {
        setTimeout(() => {
            setIsOpen(!isOpen);
        }, 500);
    }

    async function handleDelete(memberId: string) {
        try {
            await deleteMember(memberId);
            setMembers(prevMembers => prevMembers.filter(member => member._id !== memberId));
        } catch (error) {
            console.error('Failed to delete member:', error);
        }
    }

    return (
        <div className='flex flex-col'>
            <button className="flex items-center self-end gap-2 text-[#FFFFFF] rounded-lg px-4 py-2 mb-4 bg-green-800 hover:bg-green-700" onClick={onAddClick}>
                <IoAddCircleSharp className="w-5 h-5" /> Agregar
            </button>
            <div className='h-[650px] overflow-auto no-scrollbar'>
                <div className="border shadow-sm rounded-lg p-2">
                    <Table>
                        <TableHeader className='border-b hidden md:table-header-group'>
                            <TableRow>
                                <TableHead className='table-cell'>ID</TableHead>
                                <TableHead className="table-cell">Nombre</TableHead>
                                <TableHead className="hidden md:table-cell">Puesto</TableHead>
                                <TableHead className="hidden md:table-cell">LinkedIn</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map((member: MemberType, index: number) => (
                                <TableRow key={member?._id} className='flex flex-col md:flex-row md:table-row'>
                                    <TableCell className="flex md:table-cell items-center gap-2 font-medium">
                                        <span className='block md:hidden'>Id: </span>{member?._id}
                                    </TableCell>
                                    <TableCell className="flex md:table-cell items-center gap-2">
                                        <span className='block md:hidden'>Nombre: </span>{member?.name_surname}
                                    </TableCell>
                                    <TableCell className="flex md:table-cell items-center gap-2">
                                        <span className='block md:hidden'>Puesto: </span>{member?.puesto}
                                    </TableCell>
                                    <TableCell className="flex md:table-cell items-center gap-2">
                                        <span className='block md:hidden'>LinkedIn: </span>{member?.linkedIn}
                                    </TableCell>
                                    <ActionCell
                                        data={member}
                                        index={`Miembro ${index + 1}`}
                                        closeDialog={warning && currentMemberId === member._id}
                                        handleCloseDialog={handleWarning}
                                        takeCurrentId={() => setCurrentMemberId(member._id)}
                                        currentId={currentMemberId}
                                        deleteActionCell={handleDelete}
                                        editActionCell={onEditClick}
                                    />
                                    <SheetForm
                                        title='Formulario de Miembros'
                                        descripcion={actionForm
                                            ? `Editar miembro, cambiar los campos que se desea`
                                            : "Agregar Nuevo Miembro del Equipo, todos los campos son obligatorios"
                                        }
                                        isOpen={isOpen}
                                        handleOpen={handleCloseForm}
                                    >
                                        <MemberForm
                                            formAction={actionForm}
                                            memberData={currentMember}
                                        />
                                    </SheetForm>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}