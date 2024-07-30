"use client"

import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { SlOptions } from "react-icons/sl";
import { deleteEvents } from '@/queries/Events';
import { EventType } from '@/types/EventTypes';
import { EventForm } from '../forms/events-form';
import { SheetForm } from '../sheet-form';
import { IoMdSettings } from "react-icons/io";
import { IoAddCircleSharp } from 'react-icons/io5';

export function EventsTable() {
    const { events, setEvents } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);

    function onChangeOpen() {
        setIsOpen(!isOpen);
    }

    async function handleDelete(eventId: number) {
        try {
            await deleteEvents(eventId);
            setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
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
                        <TableHead className="table-cell w-[100px]">ID</TableHead>
                        <TableHead className="table-cell min-w-[150px]">Fecha</TableHead>
                        <TableHead className='hidden lg:table-cell'>Horario</TableHead>
                        <TableHead className='table-cell'>Nombre del Evento</TableHead>
                        <TableHead className='table-cell'>Descripcion</TableHead>
                    </TableHeader>
                    <TableBody>
                        {events.map((event: EventType) => (
                            <TableRow key={event._id} className='flex flex-col md:flex-row w-full md:table-row'>
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
                                            <DropdownMenuItem onClick={() => handleDelete(event._id)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                                <TableCell className="flex md:table-cell font-medium items-center gap-2">
                                    <span className='block md:hidden'>Id: </span> {event._id}
                                </TableCell>
                                <TableCell className="flex md:table-cell font-medium items-center gap-2">
                                    <span className='block md:hidden'>Fecha: </span> {event.fecha}
                                </TableCell>
                                <TableCell className="flex md:hidden lg:table-cell  items-center gap-2">
                                    <span className='block md:hidden'>Horario: </span> {event.horario}
                                </TableCell>
                                <TableCell className="flex md:table-cell font-medium items-center gap-2">
                                    <span className='block md:hidden'>Evento: </span> {event.event_name}
                                </TableCell>
                                <TableCell className="flex md:table-cell font-medium items-start md:items-center gap-2">
                                    <span className='block md:hidden'>Descripción: </span> {event.descripcion}
                                </TableCell>
                                <TableCell className="hidden md:block text-left md:text-right">
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
                                            <DropdownMenuItem onClick={() => handleDelete(event._id)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <SheetForm
                    title='Formulario de Eventos'
                    descripcion='Ingresa los detalles del evento'
                    isOpen={isOpen}
                    handleOpen={onChangeOpen}
                >
                    <EventForm />
                </SheetForm>
            </div>
        </div>
    )
}
