"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { FetchAllData } from '@/queries/FetchAllData';
import { DeleteData } from '@/queries/DeleteData';
import { AuthorityType } from '@/types/AuthTypes';

import { AuthorityForm } from '../components/forms/authorities-form';
import { ActionCell } from '../components/table-actions/actions-cell';
import { SheetForm } from '../components/table-actions/sheet-form';
import { InfoDialog } from '../components/table-actions/info-card';
import { EmptyTable } from '../components/handlers/empty-elements';
import { Loading } from '../components/handlers/loading';
import { Pagination } from '@/components/table-actions/paginado';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useToast } from '@/components/ui/use-toast';

import { IoAddCircleSharp } from 'react-icons/io5';
import { FaBriefcase } from 'react-icons/fa';
import { HiIdentification } from "react-icons/hi";
import { PiRankingFill } from "react-icons/pi";
import { DialogTitle } from '@/components/ui/dialog';

export function AuthoritiesTable() {
    const [authorities, setAuthorities] = useState<AuthorityType[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [warning, setWarning] = useState<boolean>(false);
    const [currentAuthorityId, setCurrentAuthorityId] = useState<string>("");
    const [actionForm, setActionForm] = useState<boolean>(false);
    const [currentAuthority, setCurrentAuthority] = useState<AuthorityType | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { toast } = useToast();
    const itemsPerPage: number = 5;
    const isTableEmpty = Boolean(authorities.length > 0);

    useEffect(() => {
        async function loadAuthorities() {
            setIsLoading(true);
            try {
                const updateAuthorities = await FetchAllData("authorities");
                setAuthorities(updateAuthorities);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadAuthorities();
    }, []);

    function onAddClick() {
        setIsOpen(true);
        setActionForm(false);
        setCurrentAuthority(null);
    }

    function onEditClick(authority: AuthorityType) {
        setIsOpen(true);
        setActionForm(true);
        setCurrentAuthority(authority);
        setCurrentAuthorityId(authority?._id)
    }

    function onViewClick(authority: AuthorityType) {
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
            toast({
                variant: "success",
                title: `Exito!`,
                description: `La autoridad ${authorityId} fue eliminada`,
            });
        } catch (error) {
            console.error('Failed to delete authority:', error);
            toast({
                variant: "destructive",
                title: `Error!`,
                description: `Ocurrio un error al intentar eliminar al elemento ${authorityId} (${error})`,
            });
        } finally {
            setInfoDialogOpen(false)
        }
    }

    async function refreshAuthorities() {
        try {
            const updatedAuthorities = await FetchAllData("authorities");
            setAuthorities(updatedAuthorities);
        } catch (error) {
            console.error('Failed to fetch authority:', error);
        }
    }

    const indexOfLastMember: number = currentPage * itemsPerPage;
    const indexOfFirstMember: number = indexOfLastMember - itemsPerPage;
    const currentAuthorites: AuthorityType[] = authorities.slice(indexOfFirstMember, indexOfLastMember);

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
                                        <TableHead className="table-cell">Nombre</TableHead>
                                        <TableHead className="hidden md:table-cell">Puesto</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentAuthorites.map((authority: AuthorityType, index: number) => (
                                        <TableRow key={authority?._id} className='flex flex-col md:flex-row md:table-row'>
                                            <TableCell className="flex md:table-cell items-center gap-2">
                                                <span className='block md:hidden'>Nombre: </span>{authority?.name}
                                            </TableCell>
                                            <TableCell className="flex md:table-cell items-center gap-2">
                                                <span className='block md:hidden'>Puesto: </span>{authority?.puesto}
                                            </TableCell>
                                            <ActionCell
                                                data={authority}
                                                index={`Autoridad ${index + 1}`}
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
                            </Table>
                        </div>
                    </div>
                ) : (
                    <EmptyTable
                        tableName='Autoridades'
                        Icon={HiIdentification}
                        handleClick={onAddClick}
                    />
                )}
            {authorities.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalItems={authorities.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            )}
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
                    updateID={currentAuthorityId}
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
                <div className='flex flex-col items-center justify-center'>
                    <Image
                        src={currentAuthority?.profile_pic!}
                        alt="autoridad image"
                        width={150}
                        height={150}
                        className='rounded-full w-[150px] h-[150px] self-center my-4'
                    />
                    <DialogTitle className='text-start font-bold text-xl'>{currentAuthority?.name}</DialogTitle>
                </div>
                <div className='bg-gray-100 rounded-md p-2 mt-4 flex flex-col justify-center font-semibold'>
                    <div className='flex items-center gap-2 mt-2'>
                        <HiIdentification className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentAuthority?._id}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <FaBriefcase className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentAuthority?.puesto}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <PiRankingFill className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentAuthority?.jerarquia}</span>
                    </div>
                </div>
            </InfoDialog>
        </div>
    ) : (
        <Loading />
    );
}