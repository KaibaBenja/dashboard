"use client";

import { useState, useEffect } from 'react';

import { FetchAllData } from '@/queries/FetchAllData';
import { DeleteData } from "@/queries/DeleteData";
import { DeleteManyData } from '@/queries/DeleteManyData';
import { EventType } from '@/types/EventTypes';


import { EventForm } from '../components/forms/events-form';
import { ActionCell } from '../components/table-actions/actions-cell';
import { SheetForm } from '../components/table-actions/sheet-form';
import { InfoDialog } from '../components/table-actions/info-card';
import { EmptyTable } from '../components/handlers/empty-elements';
import { Loading } from '../components/handlers/loading';
import { Pagination } from '@/components/table-actions/paginado';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useToast } from '@/components/ui/use-toast';

import { IoAddCircleSharp } from 'react-icons/io5';
import { FaCalendarCheck, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { MdOutlineTextFields, MdOutlineEventNote } from "react-icons/md";
import { HiIdentification } from "react-icons/hi";
import { BiSolidCalendarExclamation } from 'react-icons/bi';


export function EventsTable() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [warning, setWarning] = useState<boolean>(false);
    const [currentEventId, setCurrentEventId] = useState<string>("");
    const [actionForm, setActionForm] = useState<boolean>(false);
    const [currentEvent, setCurrentEvent] = useState<EventType | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { toast } = useToast();
    const itemsPerPage: number = 5;
    const isTableEmpty = Boolean(events.length > 0);

    useEffect(() => {
        async function loadEvents() {
            setIsLoading(true);
            try {
                const updateEvents = await FetchAllData("events");
                setEvents(updateEvents);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadEvents();
    }, []);

    function onAddClick() {
        setIsOpen(true);
        setActionForm(false);
        setCurrentEvent(null);
    }

    function onEditClick(event: EventType) {
        setIsOpen(true);
        setActionForm(true);
        setCurrentEvent(event);
    }

    function onViewClick(event: EventType) {
        setCurrentEvent(event);
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

    async function handleDelete(eventId: string) {
        try {
            await DeleteData("events", eventId);
            setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
            toast({
                variant: "success",
                title: `Exito!`,
                description: `El evento ${eventId} fue eliminado`,
            });
        } catch (error) {
            console.error('Failed to delete event:', error);
            toast({
                variant: "destructive",
                title: `Error!`,
                description: `Ocurrio un error al intentar eliminar al elemento ${eventId} (${error})`,
            });
        } finally {
            setInfoDialogOpen(false)
        }
    }

    async function handleDeleteMany(eventName: string) {
        try {
            await DeleteManyData("events/by-name", eventName);
            setEvents(prevEvents => prevEvents.filter(event => event._id !== eventName));
            toast({
                variant: "success",
                title: `Exito!`,
                description: `El evento ${eventName} fue eliminado`,
            });
        } catch (error) {
            console.error('Failed to delete event:', error);
            toast({
                variant: "destructive",
                title: `Error!`,
                description: `Ocurrio un error al intentar eliminar al elemento ${eventName} (${error})`,
            });
        } finally {
            setInfoDialogOpen(false)
        }
    }

    async function refreshPosts() {
        try {
            const updateEvents = await FetchAllData("events");
            setEvents(updateEvents);
        } catch (error) {
            console.error('Failed to fetch event:', error);
        }
    }

    const indexOfLastMember: number = currentPage * itemsPerPage;
    const indexOfFirstMember: number = indexOfLastMember - itemsPerPage;
    const currentEvents: EventType[] = events.slice(indexOfFirstMember, indexOfLastMember);

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
                                        <TableHead className="table-cell">Título</TableHead>
                                        <TableHead className="hidden md:table-cell">Dirección</TableHead>
                                        <TableHead className="hidden md:table-cell">Fecha</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentEvents.map((event: EventType, index: number) => (
                                        <TableRow key={event?._id} className='flex flex-col md:flex-row md:table-row'>
                                            <TableCell className="flex md:table-cell items-center gap-2 font-medium">
                                                <span className='block md:hidden'>Id: </span>{event?._id}
                                            </TableCell>
                                            <TableCell className="flex md:table-cell items-center gap-2">
                                                <span className='block md:hidden'>Título: </span>{event?.event_name}
                                            </TableCell>
                                            <TableCell className="flex md:table-cell md:items-center gap-2">
                                                <span className='block md:hidden'>Dirección: </span>{event?.direccion.split("|")[0]}
                                            </TableCell>
                                            <TableCell className="flex md:table-cell items-center gap-2">
                                                <span className='block md:hidden'>Fecha: </span>{event?.fecha_comienzo}
                                            </TableCell>
                                            <ActionCell
                                                data={event}
                                                index={`Evento ${index + 1}`}
                                                closeWarning={warning && currentEventId === event?._id}
                                                handleCloseWarning={handleWarning}
                                                takeCurrentId={() => setCurrentEventId(event?._id)}
                                                currentId={currentEventId}
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
                        tableName='Eventos'
                        Icon={MdOutlineEventNote}
                        handleClick={onAddClick}
                    />
                )}
            {events.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalItems={events.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            )}
            <SheetForm
                title='Formulario de Post'
                descripcion={actionForm
                    ? `Editar Post, cambiar los campos que se desea`
                    : "Agregar Nuevo Post, todos los campos son obligatorios"
                }
                isOpen={isOpen}
                handleOpen={handleCloseForm}
            >
                <EventForm
                    formAction={actionForm}
                    formData={currentEvent}
                    handleCloseSheet={handleCloseForm}
                    onSubmitSuccess={refreshPosts}
                />
            </SheetForm>
            <InfoDialog
                openCard={infoDialogOpen}
                openWarning={warning}
                handleOpenCard={() => setInfoDialogOpen(false)}
                handleWarning={handleWarning}
                data={currentEvent}
                takeCurrentId={() => setCurrentEventId(currentEvent?._id!)}
                currentId={currentEventId}
                deleteActionCell={handleDelete}
                editActionCell={onEditClick}
            >
                <h1 className='text-start font-bold text-xl'>{currentEvent?.event_name}</h1>
                <div className='bg-gray-100 rounded-md p-2 mt-4 flex flex-col justify-center font-semibold'>
                    <div className='flex items-center gap-2 mt-2'>
                        <HiIdentification className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentEvent?._id}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <FaMapMarkerAlt className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentEvent?.direccion}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <MdOutlineTextFields className='w-5 h-5 text-green-800' />
                        <h3>Descripción</h3>
                    </div>
                    <span className='capitalize'>• {currentEvent?.descripcion}</span>
                    <div className='flex items-center gap-2 mt-2'>
                        <FaCalendarCheck className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentEvent?.fecha_comienzo}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <BiSolidCalendarExclamation className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentEvent?.duracion_evento}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <FaClock className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentEvent?.horario_comienzo}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <FaClock className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentEvent?.horario_fin}</span>
                    </div>
                </div>
            </InfoDialog>
        </div>
    ) : (
        <Loading />
    );
}