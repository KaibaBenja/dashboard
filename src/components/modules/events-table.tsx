"use client";

import { useState, useEffect } from 'react';
import cx from "classnames";
import { deleteEvent, fetchEvents } from '@/queries/Events';
import { EventType } from '@/types/EventTypes';

import { ActionCell } from '../table-actions/actions-cell';
import { SheetForm } from '../table-actions/sheet-form';
import { InfoDialog } from '../table-actions/info-card';
import { ListSkeleton } from '../table-actions/item-skeleton';
import { EventForm } from '../forms/events-form';

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { IoAddCircleSharp } from 'react-icons/io5';
import { FaArrowCircleLeft, FaArrowCircleRight, FaCalendarCheck, FaClock } from 'react-icons/fa';
import { MdOutlineTextFields } from "react-icons/md";
import { HiIdentification } from "react-icons/hi";


export function EventsTable() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [warning, setWarning] = useState<boolean>(false);
    const [currentEventId, setCurrentEventId] = useState<string>("");
    const [actionForm, setActionForm] = useState<boolean>(false);
    const [currentEvent, setCurrentEvent] = useState<EventType | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
    const itemsPerPage: number = 5;

    useEffect(() => {
        async function loadEvents() {
            try {
                setLoading(true);
                const updateEvents = await fetchEvents();
                setEvents(updateEvents);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setLoading(false);
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
            await deleteEvent(eventId);
            setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
        } catch (error) {
            console.error('Failed to delete event:', error);
        }
    }

    async function refreshPosts() {
        try {
            setLoading(true);
            const updateEvents = await fetchEvents();
            setEvents(updateEvents);
        } catch (error) {
            console.error('Failed to fetch event:', error);
        } finally {
            setLoading(false);
        }
    }

    const indexOfLastMember: number = currentPage * itemsPerPage;
    const indexOfFirstMember: number = indexOfLastMember - itemsPerPage;
    const currentEvents: EventType[] = events.slice(indexOfFirstMember, indexOfLastMember);

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
                                <TableHead className="table-cell">Titulo</TableHead>
                                <TableHead className="hidden md:table-cell">Fecha</TableHead>
                                <TableHead className="hidden md:table-cell">Categoria</TableHead>
                            </TableRow>
                        </TableHeader>
                        {loading ? (
                            <ListSkeleton />
                        ) : (
                            <TableBody>
                                {currentEvents.map((event: EventType, index: number) => (
                                    <TableRow key={event?._id} className='flex flex-col md:flex-row md:table-row'>
                                        <TableCell className="flex md:table-cell items-center gap-2 font-medium">
                                            <span className='block md:hidden'>Id: </span>{event?._id}
                                        </TableCell>
                                        <TableCell className="flex md:table-cell items-center gap-2">
                                            <span className='block md:hidden'>Titulo: </span>{event?.fecha}
                                        </TableCell>
                                        <TableCell className="flex md:table-cell items-center gap-2">
                                            <span className='block md:hidden'>Fecha: </span>{event?.event_name}
                                        </TableCell>
                                        <TableCell className="flex md:table-cell items-center gap-2">
                                            <span className='block md:hidden'>Categoria: </span>{event?.descripcion}
                                        </TableCell>
                                        <ActionCell
                                            data={event}
                                            index={`Miembro ${index + 1}`}
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
                        )}
                    </Table>
                </div>
            </div>
            {Boolean(events.length > 5) &&
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
                        {currentPage} - {Math.ceil(events.length / itemsPerPage)}
                    </span>
                    <button
                        disabled={currentPage === Math.ceil(events.length / itemsPerPage)}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className={cx({
                            "text-gray-300 cursor-not-allowed": Boolean(currentPage === Math.ceil(events.length / itemsPerPage)),
                            "text-green-800": !Boolean(currentPage === Math.ceil(events.length / itemsPerPage))
                        })}
                    >
                        <FaArrowCircleRight className='w-6 h-6' />
                    </button>
                </div>}
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
                        <FaCalendarCheck className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentEvent?.fecha}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <FaClock className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentEvent?.horario}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <MdOutlineTextFields className='w-5 h-5 text-green-800' />
                        <h3>Descripción</h3>
                    </div>
                    <span className='capitalize'>• {currentEvent?.descripcion}</span>
                </div>
            </InfoDialog>
        </div>
    );
}