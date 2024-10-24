"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import cx from "classnames";

import { FetchAllData } from '@/queries/FetchAllData';
import { DeleteData } from '@/queries/DeleteData';
import { MemberType } from '@/types/MemberTypes';

import { MemberForm } from '../forms/members-form';
import { ActionCell } from '../table-actions/actions-cell';
import { SheetForm } from '../table-actions/sheet-form';
import { InfoDialog } from '../table-actions/info-card';

import { EmptyTable } from '../handlers/empty-elements';
import { Loading } from '../handlers/loading';

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { IoAddCircleSharp } from 'react-icons/io5';
import { RiTeamFill } from "react-icons/ri";
import { FaArrowCircleLeft, FaArrowCircleRight, FaLinkedin, FaBriefcase } from 'react-icons/fa';
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
    const itemsPerPage: number = 5;
    const isTableEmpty = Boolean(members.length > 0);

    useEffect(() => {
        async function loadMembers() {
            try {
                const updatedMembers = await FetchAllData("members");
                setMembers(updatedMembers);
            } catch (error) {
                console.error('Failed to fetch members:', error);
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
        } catch (error) {
            console.error('Failed to delete member:', error);
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

    return isTableEmpty ? (
        <div className='flex flex-col'>
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
            {Boolean(members.length > 5) &&
                <div className="flex items-end justify-center gap-4 mt-4 text-green-800">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className={cx({
                            "text-gray-300 cursor-not-allowed": Boolean(currentPage === 1),
                            "text-green-800": !Boolean(currentPage === 1)
                        })}
                    >
                        <FaArrowCircleLeft className='w-6 h-6' />
                    </button>
                    <span className='font-semibold '>
                        {currentPage} - {Math.ceil(members.length / itemsPerPage)}
                    </span>
                    <button
                        disabled={currentPage === Math.ceil(members.length / itemsPerPage)}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className={cx({
                            "text-gray-300 cursor-not-allowed": Boolean(currentPage === Math.ceil(members.length / itemsPerPage)),
                            "text-green-800": !Boolean(currentPage === Math.ceil(members.length / itemsPerPage))
                        })}
                    >
                        <FaArrowCircleRight className='w-6 h-6' />
                    </button>
                </div>}
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
                {Boolean(currentMember?.profile_pic) &&
                    <Image
                        src={`${currentMember?.profile_pic}`}
                        alt="example"
                        width={150}
                        height={150}
                        className='rounded-full w-[150px] h-[150px] self-center my-4'
                    />
                }
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
                        <span className='capitalize'>{currentMember?.linkedIn}</span>
                    </div>
                </div>
            </InfoDialog>
        </div>
    ) : (
        <Loading />
    );
}