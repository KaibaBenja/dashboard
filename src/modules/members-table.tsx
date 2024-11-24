"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { FetchAllData } from '@/queries/FetchAllData';
import { DeleteData } from '@/queries/DeleteData';
import { MemberType } from '@/types/MemberTypes';

import { MemberForm } from '../components/forms/members-form';
import { ActionCell } from '../components/table-actions/actions-cell';
import { SheetForm } from '../components/table-actions/sheet-form';
import { InfoDialog } from '../components/table-actions/info-card';
import { EmptyTable } from '../components/handlers/empty-elements';
import { Loading } from '../components/handlers/loading';
import { Pagination } from '@/components/table-actions/paginado';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useToast } from '@/components/ui/use-toast';

import { IoAddCircleSharp } from 'react-icons/io5';
import { RiTeamFill } from "react-icons/ri";
import { FaLinkedin, FaBriefcase } from 'react-icons/fa';
import { HiIdentification } from "react-icons/hi";

export function MembersTable() {
    const [members, setMembers] = useState<MemberType[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [warning, setWarning] = useState<boolean>(false);
    const [currentMemberId, setCurrentMemberId] = useState<string>("");
    const [actionForm, setActionForm] = useState<boolean>(false);
    const [currentMember, setCurrentMember] = useState<MemberType | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { toast } = useToast();
    const itemsPerPage: number = 5;
    const isTableEmpty = Boolean(members.length > 0);

    useEffect(() => {
        async function loadMembers() {
            setIsLoading(true);
            try {
                const updatedMembers = await FetchAllData("members");
                setMembers(updatedMembers);
            } catch (error) {
                console.error('Failed to fetch members:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadMembers();
    }, []);

    function onAddClick() {
        setIsOpen(true);
        setActionForm(false);
        setCurrentMember(null);
    }

    function onEditClick(member: MemberType) {
        setIsOpen(true);
        setActionForm(true);
        setCurrentMember(member);
        setCurrentMemberId(member._id);
    }

    function onViewClick(member: MemberType) {
        setCurrentMember(member);
        setInfoDialogOpen(true);
    }

    function handleWarning() {
        setWarning(!warning);
    }

    function handleCloseForm() {
        setTimeout(() => {
            setIsOpen(!isOpen);
            setInfoDialogOpen(false);
        }, 300);
    }

    async function handleDelete(memberId: string) {
        try {
            await DeleteData("members", memberId);
            setMembers(prevMembers => prevMembers.filter(member => member._id !== memberId));
            toast({
                variant: "success",
                title: `Exito!`,
                description: `El miembro ${memberId} fue eliminado`,
            });
        } catch (error) {
            console.error('Failed to delete member:', error);
            toast({
                variant: "destructive",
                title: `Error!`,
                description: `Ocurrio un error al intentar eliminar al elemento ${memberId} (${error})`,
            });
        } finally {
            setInfoDialogOpen(false)
        }
    }

    async function refreshMembers() {
        try {
            const updatedMembers = await FetchAllData("members");
            setMembers(updatedMembers);
        } catch (error) {
            console.error('Failed to fetch members:', error);
        }
    }

    const indexOfLastMember: number = currentPage * itemsPerPage;
    const indexOfFirstMember: number = indexOfLastMember - itemsPerPage;
    const currentMembers: MemberType[] = members.slice(indexOfFirstMember, indexOfLastMember);

    return !isLoading ? (
        <div className='flex flex-col justify-between h-full mb-14'>
            {isTableEmpty
                ? (
                    <div className='flex flex-col'>
                        <button className="flex items-center self-end gap-2 text-[#FFFFFF] rounded-lg px-4 py-2 mb-4 bg-green-800 hover:bg-green-700" onClick={onAddClick}>
                            <IoAddCircleSharp className="w-5 h-5" /> Agregar
                        </button>
                        <div className="border shadow-sm rounded-lg p-2">
                            <Table>
                                <TableHeader className='border-b hidden md:table-header-group'>
                                    <TableRow>
                                        <TableHead className='table-cell'>ID</TableHead>
                                        <TableHead className="table-cell">Nombre</TableHead>
                                        <TableHead className="hidden md:table-cell">Equipo</TableHead>
                                        <TableHead className="hidden md:table-cell">Puesto</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentMembers.map((member: MemberType, index: number) => (
                                        <TableRow key={member?._id} className='flex flex-col md:flex-row md:table-row'>
                                            <TableCell className="flex md:table-cell items-center gap-2 font-medium">
                                                <span className='block md:hidden'>Id: </span>{member?._id}
                                            </TableCell>
                                            <TableCell className="flex md:table-cell items-center gap-2">
                                                <span className='block md:hidden'>Nombre: </span>{member?.name_surname}
                                            </TableCell>
                                            <TableCell className="flex md:table-cell items-center gap-2">
                                                <span className='block md:hidden'>Equipo: </span>{member?.team}
                                            </TableCell>
                                            <TableCell className="flex md:table-cell items-center gap-2">
                                                <span className='block md:hidden'>Puesto: </span>{member?.puesto}
                                            </TableCell>
                                            <ActionCell
                                                data={member}
                                                index={`Miembro ${index + 1}`}
                                                closeWarning={warning && currentMemberId === member._id}
                                                handleCloseWarning={handleWarning}
                                                takeCurrentId={() => setCurrentMemberId(member._id)}
                                                currentId={currentMemberId}
                                                deleteActionCell={handleDelete}
                                                editActionCell={onEditClick}
                                                viewActionCell={onViewClick}
                                            />
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </div>
                    </div>
                ) : (
                    <EmptyTable
                        tableName='Miembros'
                        Icon={HiIdentification}
                        handleClick={onAddClick}
                    />
                )}
            {members.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalItems={members.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            )}
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
                    updateID={currentMemberId}
                    formAction={actionForm}
                    formData={currentMember}
                    handleCloseSheet={handleCloseForm}
                    onSubmitSuccess={refreshMembers}
                />
            </SheetForm>
            <InfoDialog
                openCard={infoDialogOpen}
                openWarning={warning}
                handleOpenCard={() => setInfoDialogOpen(false)}
                handleWarning={handleWarning}
                data={currentMember}
                takeCurrentId={() => setCurrentMemberId(currentMember?._id!)}
                currentId={currentMemberId}
                deleteActionCell={handleDelete}
                editActionCell={onEditClick}
            >
                <div className='w-full flex justify-center'>
                    <Image
                        src={`${currentMember?.profile_pic}`}
                        alt="example"
                        width={150}
                        height={150}
                        className='rounded-full w-[150px] h-[150px] flex justify-center my-4'
                    />
                </div>
                <h1 className='text-center font-bold text-xl'>{currentMember?.name_surname}</h1>
                <div className='bg-gray-100 rounded-md p-2 mt-4 flex flex-col justify-center gap-4 font-semibold'>
                    <div className='flex items-center gap-2'>
                        <HiIdentification className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentMember?._id}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <RiTeamFill className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentMember?.team}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <FaBriefcase className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentMember?.puesto}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <FaLinkedin className='w-5 h-5 text-green-800' />
                        <Link href={`${currentMember?.linkedIn}`} target="_blank" className='hover:underline hover:text-[#66cc00]'>
                            {currentMember?.linkedIn}
                        </Link>
                    </div>
                </div>
            </InfoDialog>
        </div>
    ) : (
        <Loading />
    );
}