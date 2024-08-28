"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import cx from "classnames";
import { FetchAllData } from '@/queries/FetchAllData';
import { DeleteData } from '@/queries/DeleteData';
import { AuthoritieType } from '@/types/AuthTypes';

import { ActionCell } from '../table-actions/actions-cell';
import { SheetForm } from '../table-actions/sheet-form';
import { InfoDialog } from '../table-actions/info-card';
import { ListSkeleton } from '../table-actions/item-skeleton';
import { AuthorityForm } from '../forms/authorities-form';

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { IoAddCircleSharp } from 'react-icons/io5';
import { FaArrowCircleLeft, FaArrowCircleRight, FaBriefcase } from 'react-icons/fa';
import { HiIdentification } from "react-icons/hi";

import ExampleImg from "../../images/logo-c.png"

export function AuthoritiesTable() {
    const [authorities, setAuthorities] = useState<AuthoritieType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [warning, setWarning] = useState<boolean>(false);
    const [currentAuthorityId, setCurrentAuthorityId] = useState<string>("");
    const [actionForm, setActionForm] = useState<boolean>(false);
    const [currentAuthority, setCurrentAuthority] = useState<AuthoritieType | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
    const itemsPerPage: number = 5;

    useEffect(() => {
        async function loadAuthorities() {
            try {
                setLoading(true);
                const updateAuthorities = await FetchAllData("authorities");
                setAuthorities(updateAuthorities);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setLoading(false);
            }
        }

        loadAuthorities();
    }, []);

    function onAddClick() {
        setIsOpen(true);
        setActionForm(false);
        setCurrentAuthority(null);
    }

    function onEditClick(authority: AuthoritieType) {
        setIsOpen(true);
        setActionForm(true);
        setCurrentAuthority(authority);
    }

    function onViewClick(authority: AuthoritieType) {
        setCurrentAuthority(authority);
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

    async function handleDelete(authorityId: string) {
        try {
            await DeleteData("authorities", authorityId);
            setAuthorities(prevAuthority => prevAuthority.filter(authority => authority._id !== authorityId));
        } catch (error) {
            console.error('Failed to delete authority:', error);
        }
    }

    async function refreshAuthorities() {
        try {
            setLoading(true);
            const updatedAuthorities = await FetchAllData("authorities");
            setAuthorities(updatedAuthorities);
        } catch (error) {
            console.error('Failed to fetch authority:', error);
        } finally {
            setLoading(false);
        }
    }

    const indexOfLastMember: number = currentPage * itemsPerPage;
    const indexOfFirstMember: number = indexOfLastMember - itemsPerPage;
    const currentAuthorites: AuthoritieType[] = authorities.slice(indexOfFirstMember, indexOfLastMember);

    return (
        <div className='flex flex-col'>
            <button className="flex items-center self-end gap-2 text-[#FFFFFF] rounded-lg px-4 py-2 mb-4 bg-green-800 hover:bg-green-700" onClick={onAddClick}>
                <IoAddCircleSharp className="w-5 h-5" /> Agregar
            </button>
            <div>
                <div className="border shadow-sm rounded-lg p-2">
                    <Table>
                        <TableHeader className='border-b hidden md:table-header-group'>
                            <TableRow>
                                <TableHead className='table-cell'>ID</TableHead>
                                <TableHead className="table-cell">Nombre</TableHead>
                                <TableHead className="hidden md:table-cell">Puesto</TableHead>
                            </TableRow>
                        </TableHeader>
                        {loading ? (
                            <ListSkeleton />
                        ) : (
                            <TableBody>
                                {currentAuthorites.map((authority: AuthoritieType, index: number) => (
                                    <TableRow key={authority?._id} className='flex flex-col md:flex-row md:table-row'>
                                        <TableCell className="flex md:table-cell items-center gap-2 font-medium">
                                            <span className='block md:hidden'>Id: </span>{authority?._id}
                                        </TableCell>
                                        <TableCell className="flex md:table-cell items-center gap-2">
                                            <span className='block md:hidden'>Titulo: </span>{authority?.name}
                                        </TableCell>
                                        <TableCell className="flex md:table-cell items-center gap-2">
                                            <span className='block md:hidden'>Fecha: </span>{authority?.puesto}
                                        </TableCell>
                                        <ActionCell
                                            data={authority}
                                            index={`Miembro ${index + 1}`}
                                            closeWarning={warning && currentAuthorityId === authority?._id}
                                            handleCloseWarning={handleWarning}
                                            takeCurrentId={() => setCurrentAuthorityId(authority?._id)}
                                            currentId={currentAuthorityId}
                                            deleteActionCell={handleDelete}
                                            editActionCell={onEditClick}
                                            viewActionCell={onViewClick}
                                        />
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </div>
            </div>
            {Boolean(authorities.length > 5) &&
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
                        {currentPage} - {Math.ceil(authorities.length / itemsPerPage)}
                    </span>
                    <button
                        disabled={currentPage === Math.ceil(authorities.length / itemsPerPage)}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className={cx({
                            "text-gray-300 cursor-not-allowed": Boolean(currentPage === Math.ceil(authorities.length / itemsPerPage)),
                            "text-green-800": !Boolean(currentPage === Math.ceil(authorities.length / itemsPerPage))
                        })}
                    >
                        <FaArrowCircleRight className='w-6 h-6' />
                    </button>
                </div>}
            <SheetForm
                title='Formulario de Autoridades'
                descripcion={actionForm
                    ? `Editar Autoridad, cambiar los campos que se desea`
                    : "Agregar Nueva Autoridad, todos los campos son obligatorios"
                }
                isOpen={isOpen}
                handleOpen={handleCloseForm}
            >
                <AuthorityForm
                    formAction={actionForm}
                    formData={currentAuthority}
                    handleCloseSheet={handleCloseForm}
                    onSubmitSuccess={refreshAuthorities}
                />
            </SheetForm>
            <InfoDialog
                openCard={infoDialogOpen}
                openWarning={warning}
                handleOpenCard={() => setInfoDialogOpen(false)}
                handleWarning={handleWarning}
                data={currentAuthority}
                takeCurrentId={() => setCurrentAuthorityId(currentAuthority?._id!)}
                currentId={currentAuthorityId}
                deleteActionCell={handleDelete}
                editActionCell={onEditClick}
            >
                {Boolean(currentAuthority?.profile_pic) && <Image
                    src={currentAuthority?.profile_pic!}
                    alt="example"
                    width={80}
                    height={80}
                    className='rounded-full object-cover self-center my-4'
                />}
                <Image
                    src={ExampleImg}
                    alt="example"
                    width={80}
                    height={80}
                    className='rounded-full object-cover self-center my-4'
                />
                <h1 className='text-start font-bold text-xl'>{currentAuthority?.name}</h1>
                <div className='bg-gray-100 rounded-md p-2 mt-4 flex flex-col justify-center font-semibold'>
                    <div className='flex items-center gap-2 mt-2'>
                        <HiIdentification className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentAuthority?._id}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <FaBriefcase className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentAuthority?.puesto}</span>
                    </div>
                </div>
            </InfoDialog>
        </div>
    );
}