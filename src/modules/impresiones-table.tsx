"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { FetchAllData } from '@/queries/FetchAllData';
import { DeleteData } from '@/queries/DeleteData';
import { ImpresionType } from '@/types/ImpresionTypes';

import { ImpresionForm } from '../components/forms/impresiones-form';
import { ActionCell } from '../components/table-actions/actions-cell';
import { SheetForm } from '../components/table-actions/sheet-form';
import { InfoDialog } from '../components/table-actions/info-card';
import { EmptyTable } from '../components/handlers/empty-elements';
import { Loading } from '../components/handlers/loading';
import { Pagination } from '@/components/table-actions/paginado';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useToast } from '@/components/ui/use-toast';

import { IoAddCircleSharp } from 'react-icons/io5';
import { HiIdentification } from "react-icons/hi";
import { BsBadge3D } from 'react-icons/bs';
import { MdDescription } from 'react-icons/md';

export function ImpresionesTable() {
    const [impresiones, setImpresiones] = useState<ImpresionType[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [warning, setWarning] = useState<boolean>(false);
    const [currentImpresionId, setCurrentImpresionId] = useState<string>("");
    const [actionForm, setActionForm] = useState<boolean>(false);
    const [currentImpresion, setCurrentImpresion] = useState<ImpresionType | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { toast } = useToast();
    const itemsPerPage: number = 5;
    const isTableEmpty = Boolean(impresiones.length > 0);

    useEffect(() => {
        async function loadimpresiones() {
            setIsLoading(true);
            try {
                const updateimpresiones = await FetchAllData("impresiones");
                setImpresiones(updateimpresiones);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadimpresiones();
    }, []);

    function onAddClick() {
        setIsOpen(true);
        setActionForm(false);
        setCurrentImpresion(null);
    }

    function onEditClick(Impresion: ImpresionType) {
        setIsOpen(true);
        setActionForm(true);
        setCurrentImpresion(Impresion);
        setCurrentImpresionId(Impresion?._id)
    }

    function onViewClick(Impresion: ImpresionType) {
        setCurrentImpresion(Impresion);
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

    async function handleDelete(ImpresionId: string) {
        try {
            await DeleteData("impresiones", ImpresionId);
            setImpresiones(prevImpresion => prevImpresion.filter(Impresion => Impresion._id !== ImpresionId));
            toast({
                variant: "success",
                title: `Exito!`,
                description: `La Impresión ${ImpresionId} fue eliminada`,
            });
        } catch (error) {
            console.error('Failed to delete Impresion:', error);
            toast({
                variant: "destructive",
                title: `Error!`,
                description: `Ocurrio un error al intentar eliminar al elemento ${ImpresionId} (${error})`,
            });
        } finally {
            setInfoDialogOpen(false)
        }
    }

    async function refreshimpresiones() {
        try {
            const updatedimpresiones = await FetchAllData("impresiones");
            setImpresiones(updatedimpresiones);
        } catch (error) {
            console.error('Failed to fetch Impresion:', error);
        }
    }

    const indexOfLastMember: number = currentPage * itemsPerPage;
    const indexOfFirstMember: number = indexOfLastMember - itemsPerPage;
    const currentImpresiones: ImpresionType[] = impresiones.slice(indexOfFirstMember, indexOfLastMember);

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
                                        <TableHead className="hidden md:table-cell">Puesto</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentImpresiones.map((Impresion: ImpresionType, index: number) => (
                                        <TableRow key={Impresion?._id} className='flex flex-col md:flex-row md:table-row'>
                                            <TableCell className="flex md:table-cell items-center gap-2 font-medium">
                                                <span className='block md:hidden'>Id: </span>{Impresion?._id}
                                            </TableCell>
                                            <TableCell className="flex md:table-cell items-center gap-2">
                                                <span className='block md:hidden'>Titulo: </span>{Impresion?.titulo}
                                            </TableCell>
                                            <TableCell className="flex md:table-cell items-center gap-2">
                                                <span className='block md:hidden'>Epígrafe: </span>{Impresion?.epigrafe}
                                            </TableCell>
                                            <ActionCell
                                                data={Impresion}
                                                index={`Impresión ${index + 1}`}
                                                closeWarning={warning && currentImpresionId === Impresion?._id}
                                                handleCloseWarning={handleWarning}
                                                takeCurrentId={() => setCurrentImpresionId(Impresion?._id)}
                                                currentId={currentImpresionId}
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
                        tableName='Impresiones'
                        Icon={BsBadge3D}
                        handleClick={onAddClick}
                    />
                )}
            {impresiones.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalItems={impresiones.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            )}
            <SheetForm
                title='Formulario de Impresiones'
                descripcion={actionForm
                    ? `Editar Impresión, cambiar los campos que se desea`
                    : "Agregar Nueva Impresión, todos los campos son obligatorios"
                }
                isOpen={isOpen}
                handleOpen={handleCloseForm}
            >
                <ImpresionForm
                    updateID={currentImpresionId}
                    formAction={actionForm}
                    formData={currentImpresion}
                    handleCloseSheet={handleCloseForm}
                    onSubmitSuccess={refreshimpresiones}
                />
            </SheetForm>
            <InfoDialog
                openCard={infoDialogOpen}
                openWarning={warning}
                handleOpenCard={() => setInfoDialogOpen(false)}
                handleWarning={handleWarning}
                data={currentImpresion}
                takeCurrentId={() => setCurrentImpresionId(currentImpresion?._id!)}
                currentId={currentImpresionId}
                deleteActionCell={handleDelete}
                editActionCell={onEditClick}
            >
                    <div className="w-full mb-4">
                        <div className="relative w-full h-0 pb-[100%]">
                            <Image
                                src={currentImpresion?.impresion_image[0]!}
                                alt="impresion image"
                                fill
                                className="object-cover rounded-lg"
                                priority
                            />
                        </div>
                    </div>
                    <h1 className="text-start font-bold text-xl mb-4">{currentImpresion?.titulo}</h1>
                    <div className="bg-gray-100 rounded-md p-4 w-full">
                        <div className="flex items-center gap-2 mb-2">
                            <HiIdentification className="w-5 h-5 text-green-800 flex-shrink-0" />
                            <span className="capitalize break-all">{currentImpresion?._id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MdDescription className="w-5 h-5 text-green-800 flex-shrink-0" />
                            <span className="capitalize break-all">{currentImpresion?.epigrafe}</span>
                        </div>
                    </div>
            </InfoDialog>
        </div>
    ) : (
        <Loading />
    );
}