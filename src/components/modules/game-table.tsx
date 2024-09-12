"use client";

import { useState, useEffect } from 'react';
import cx from "classnames";
import { GameType } from '@/types/GameTypes';
import { FetchAllData } from '@/queries/FetchAllData';
import { DeleteData } from '@/queries/DeleteData';

import { GameForm } from '../forms/game-form';
import { ActionCell } from '../table-actions/actions-cell';
import { SheetForm } from '../table-actions/sheet-form';
import { InfoDialog } from '../table-actions/info-card';
import { ListSkeleton } from '../table-actions/item-skeleton';

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { IoAddCircleSharp } from 'react-icons/io5';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import Image from 'next/image';

export function GameTable() {
    const [games, setGames] = useState<GameType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [warning, setWarning] = useState<boolean>(false);
    const [currentGameId, setCurrentGameId] = useState<string>("");
    const [actionForm, setActionForm] = useState<boolean>(false);
    const [currentGame, setCurrentGame] = useState<GameType | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
    const itemsPerPage: number = 5;

    useEffect(() => {
        async function loadGames() {
            try {
                setLoading(true);
                const updatedGames = await FetchAllData("games");
                setGames(updatedGames);
            } catch (error) {
                console.error('Failed to fetch games:', error);
            } finally {
                setLoading(false);
            }
        }

        loadGames();
    }, []);

    function onAddClick() {
        setIsOpen(true);
        setActionForm(false);
        setCurrentGame(null);
    }

    function onEditClick(game: GameType) {
        setIsOpen(true);
        setActionForm(true);
        setCurrentGame(game);
    }

    function onViewClick(game: GameType) {
        setCurrentGame(game);
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

    async function handleDelete(gameId: string) {
        try {
            await DeleteData("games", gameId);
            setGames(prevGames => prevGames.filter(game => game._id !== gameId));
        } catch (error) {
            console.error('Failed to delete game:', error);
        }
    }

    async function refreshGames() {
        try {
            setLoading(true);
            const updatedGames = await FetchAllData("games");
            setGames(updatedGames);
        } catch (error) {
            console.error('Failed to fetch games:', error);
        } finally {
            setLoading(false);
        }
    }

    const indexOfLastGame: number = currentPage * itemsPerPage;
    const indexOfFirstGame: number = indexOfLastGame - itemsPerPage;
    const currentGames: GameType[] = games.slice(indexOfFirstGame, indexOfLastGame);

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
                                <TableHead className="table-cell">Título</TableHead>
                                <TableHead className="hidden md:table-cell">Autor</TableHead>
                                <TableHead className="hidden md:table-cell">Tecnologías</TableHead>
                            </TableRow>
                        </TableHeader>
                        {loading ? (
                            <ListSkeleton />
                        ) : (
                            <TableBody>
                                {currentGames.map((game: GameType, index: number) => (
                                    <TableRow key={game?._id} className='flex flex-col md:flex-row md:table-row'>
                                        <TableCell className="flex md:table-cell items-center gap-2 font-medium">
                                            <span className='block md:hidden'>Id: </span>{game?._id}
                                        </TableCell>
                                        <TableCell className="flex md:table-cell items-center gap-2">
                                            <span className='block md:hidden'>Título: </span>{game?.titulo}
                                        </TableCell>
                                        <TableCell className="flex md:table-cell items-center gap-2">
                                            <span className='block md:hidden'>Autor: </span>{game?.autor}
                                        </TableCell>
                                        <TableCell className="flex md:table-cell items-center gap-2">
                                            <span className='block md:hidden'>Tecnologías: </span>{game?.tecnologias}
                                        </TableCell>
                                        <ActionCell
                                            data={game}
                                            index={`Juego ${index + 1}`}
                                            closeWarning={warning && currentGameId === game._id}
                                            handleCloseWarning={handleWarning}
                                            takeCurrentId={() => setCurrentGameId(game._id)}
                                            currentId={currentGameId}
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
            {Boolean(games.length >= 5) &&
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
                        {currentPage} - {Math.ceil(games.length / itemsPerPage)}
                    </span>
                    <button
                        disabled={currentPage === Math.ceil(games.length / itemsPerPage)}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className={cx({
                            "text-gray-300 cursor-not-allowed": Boolean(currentPage === Math.ceil(games.length / itemsPerPage)),
                            "text-green-800": !Boolean(currentPage === Math.ceil(games.length / itemsPerPage))
                        })}
                    >
                        <FaArrowCircleRight className='w-6 h-6' />
                    </button>
                </div>}
            <SheetForm
                title='Formulario de Juego'
                descripcion={actionForm
                    ? `Editar juego, cambiar los campos que se desea`
                    : "Agregar Nuevo Juego, todos los campos son obligatorios"
                }
                isOpen={isOpen}
                handleOpen={handleCloseForm}
            >
                <GameForm
                    formAction={actionForm}
                    formData={currentGame}
                    handleCloseSheet={handleCloseForm}
                    onSubmitSuccess={refreshGames}
                />
            </SheetForm>
            <InfoDialog
                openCard={infoDialogOpen}
                openWarning={warning}
                handleOpenCard={() => setInfoDialogOpen(false)}
                handleWarning={handleWarning}
                data={currentGame}
                takeCurrentId={() => setCurrentGameId(currentGame?._id!)}
                currentId={currentGameId}
                deleteActionCell={handleDelete}
                editActionCell={onEditClick}
            >
                <h1 className='text-center font-bold text-xl'>{currentGame?.titulo}</h1>
                <div className="mt-4">
                    <p><strong>Autor:</strong> {currentGame?.autor}</p>
                    <p><strong>Sinopsis:</strong> {currentGame?.sinopsis}</p>
                    <p><strong>Aporte al Turismo:</strong> {currentGame?.aporte_turismo}</p>
                    <p><strong>Aporte a la Cultura:</strong> {currentGame?.aporte_cultura}</p>
                    <p><strong>Aporte a la Juventud:</strong> {currentGame?.aporte_juventud}</p>
                    <p><strong>Aporte a la Educacion:</strong> {currentGame?.aporte_educacion}</p>
                    <p><strong>Objetivo:</strong> {currentGame?.objetivo}</p>
                    <p><strong>Desarrollo:</strong> {currentGame?.desarrollo}</p>
                    <p><strong>Condiciones:</strong> {currentGame?.condiciones}</p>
                    <p><strong>Controles:</strong> {currentGame?.controles}</p>
                    <p><strong>Tecnologias:</strong> {currentGame?.tecnologias}</p>
                    <p><strong>Estilo:</strong> {currentGame?.estilo}</p>
                    <p><strong>Género:</strong> {currentGame?.genero}</p>
                    <Image src={currentGame?.game_assets?.game_images?.[0] || ''} alt="Game Image" width={500} height={100}/>
                </div>
            </InfoDialog>
        </div>
    );
}