"use client";

import { useState, useEffect } from 'react';

import { FetchAllData } from '@/queries/FetchAllData';
import { DeleteData } from '@/queries/DeleteData';
import { GameType } from '@/types/GameTypes';

import { GameForm } from '../components/forms/game-form';
import { ActionCell } from '../components/table-actions/actions-cell';
import { SheetForm } from '../components/table-actions/sheet-form';
import { InfoDialog } from '../components/table-actions/info-card';
import { CarouselImage } from '../components/table-actions/carousel-image';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { EmptyTable } from '../components/handlers/empty-elements';
import { Loading } from '../components/handlers/loading';
import { Pagination } from '@/components/table-actions/paginado';
import { useToast } from '@/components/ui/use-toast';

import { IoAddCircleSharp, IoPeople } from 'react-icons/io5';
import { FaListUl } from 'react-icons/fa';
import { IoGameController } from "react-icons/io5";
import { HiIdentification } from 'react-icons/hi';
import { MdOutlineTextFields, MdStyle } from 'react-icons/md';
import { GoGoal } from 'react-icons/go';
import { TbFileArrowRight } from 'react-icons/tb';

export function GameTable() {
    const [games, setGames] = useState<GameType[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [warning, setWarning] = useState<boolean>(false);
    const [currentGameId, setCurrentGameId] = useState<string>("");
    const [actionForm, setActionForm] = useState<boolean>(false);
    const [currentGame, setCurrentGame] = useState<GameType | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { toast } = useToast();
    const itemsPerPage: number = 5;
    const isTableEmpty = Boolean(games.length > 0);

    useEffect(() => {
        async function loadGames() {
            setIsLoading(true);
            try {
                const updatedGames = await FetchAllData("games");
                setGames(updatedGames);
            } catch (error) {
                console.error('Failed to fetch games:', error);
            } finally {
                setIsLoading(false);
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
            toast({
                variant: "success",
                title: `Exito!`,
                description: `El juego ${gameId} fue eliminado`,
            });
        } catch (error) {
            console.error('Failed to delete game:', error);
            toast({
                variant: "destructive",
                title: `Error!`,
                description: `Ocurrio un error al intentar eliminar al elemento ${gameId} (${error})`,
            });
        } finally {
            setInfoDialogOpen(false)
        }
    }

    async function refreshGames() {
        try {
            const updatedGames = await FetchAllData("games");
            setGames(updatedGames);
        } catch (error) {
            console.error('Failed to fetch games:', error);
        }
    }

    const indexOfLastGame: number = currentPage * itemsPerPage;
    const indexOfFirstGame: number = indexOfLastGame - itemsPerPage;
    const currentGames: GameType[] = games.slice(indexOfFirstGame, indexOfLastGame);

    return !isLoading ? (
        <div className='flex flex-col justify-between h-full mb-14'>
            {isTableEmpty
                ? <div className='flex flex-col'>
                    <button className="flex items-center self-end gap-2 text-[#FFFFFF] rounded-lg px-4 py-2 mb-4 bg-green-800 hover:bg-green-700" onClick={onAddClick}>
                        <IoAddCircleSharp className="w-5 h-5" /> Agregar
                    </button>
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
                                            <span className='block md:hidden'>Autor: </span>{game?.autores.join("\n")}
                                        </TableCell>
                                        <TableCell className="flex md:table-cell items-center gap-2">
                                            <span className='block md:hidden'>Tecnologías: </span>{game?.tecnologias.join("\n")}
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
                        </Table>
                    </div>
                </div>
                : <EmptyTable
                    tableName='Juegos'
                    Icon={IoGameController}
                    handleClick={onAddClick}
                />
            }
            {games.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalItems={games.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            )}
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
                <CarouselImage
                    images={currentGame?.game_images!}
                />
                <h1 className='text-center font-bold text-xl'>{currentGame?.titulo}</h1>
                <div className='bg-gray-100 rounded-md p-2 pb-12 mt-4 flex flex-col justify-center font-semibold'>
                    <div className='flex items-center gap-2 mt-2'>
                        <HiIdentification className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentGame?._id}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <IoPeople className='w-5 h-5 text-green-800' />
                        <span>Autor/es:</span>
                    </div>
                    {currentGame?.autores.map((autor: string, index: number) => (
                        <span key={index} className='capitalize'>• {autor}</span>
                    ))}
                    <div className='flex items-center gap-2 mt-2'>
                        <MdOutlineTextFields className='w-5 h-5 text-green-800' />
                        <h3>Sinopsis:</h3>
                    </div>
                    <span className='capitalize'>• {currentGame?.sinopsis}</span>
                    <div className='flex items-center gap-2 mt-2'>
                        <FaListUl className='w-5 h-5 text-green-800' />
                        <span>Aporte al Turismo:</span>
                    </div>
                    {currentGame?.aporte_turismo.map((aporte: string, index: number) => (
                        <span key={index} className='capitalize my-2'>• {aporte}</span>
                    ))}
                    <div className='flex items-center gap-2 mt-2'>
                        <FaListUl className='w-5 h-5 text-green-800' />
                        <span>Aporte a la Cultura:</span>
                    </div>
                    {currentGame?.aporte_cultura.map((aporte: string, index: number) => (
                        <span key={index} className='capitalize my-2'>• {aporte}</span>
                    ))}
                    <div className='flex items-center gap-2 mt-2'>
                        <FaListUl className='w-5 h-5 text-green-800' />
                        <span>Aporte a la Juventud:</span>
                    </div>
                    {currentGame?.aporte_juventud.map((aporte: string, index: number) => (
                        <span key={index} className='capitalize my-2'>• {aporte}</span>
                    ))}
                    <div className='flex items-center gap-2 mt-2'>
                        <FaListUl className='w-5 h-5 text-green-800' />
                        <span>Aporte a la Educación:</span>
                    </div>
                    {currentGame?.aporte_educacion.map((aporte: string, index: number) => (
                        <span key={index} className='capitalize my-2'>• {aporte}</span>
                    ))}
                    <div className='flex items-center'>
                        <GoGoal className='w-5 h-5 text-green-800' />
                        <span className='capitalize ml-2'>Objetivo del Juego:</span>
                    </div>
                    <span className='capitalize ml-2'>{currentGame?.objetivo}</span>
                    <div className='flex items-center'>
                        <TbFileArrowRight className='w-5 h-5 text-green-800' />
                        <span className='capitalize ml-2'>Desarrollo del Juego:</span>
                    </div>
                    <span className='capitalize ml-2'>{currentGame?.desarrollo_juego}</span>
                    <div className='flex items-center gap-2 mt-2'>
                        <FaListUl className='w-5 h-5 text-green-800' />
                        <span>Condiciones:</span>
                    </div>
                    {currentGame?.condiciones_juego.map((condicion: string, index: number) => (
                        <span key={index} className='capitalize my-2'>• {condicion}</span>
                    ))}
                    <div className='flex items-center gap-2 mt-2'>
                        <FaListUl className='w-5 h-5 text-green-800' />
                        <span>Controles:</span>
                    </div>
                    {currentGame?.controles.map((control: string, index: number) => (
                        <span key={index} className='capitalize my-2'>• {control}</span>
                    ))}
                    <div className='flex items-center gap-2 mt-2'>
                        <FaListUl className='w-5 h-5 text-green-800' />
                        <span>Tecnologías:</span>
                    </div>
                    {currentGame?.tecnologias.map((tecnologia: string, index: number) => (
                        <span key={index} className='capitalize my-2'>• {tecnologia}</span>
                    ))}
                    <div className='flex items-center'>
                        <MdStyle className='w-8 h-8 text-green-800' />
                        <span className='capitalize ml-2'>Estilo del Juego:</span>
                    </div>
                    <span className='capitalize ml-2'>{currentGame?.estilo}</span>
                    <div className='flex items-center'>
                        <MdStyle className='w-8 h-8 text-green-800' />
                        <span className='capitalize ml-2'>Genero del Juego:</span>
                    </div>
                    <span className='capitalize ml-2'>{currentGame?.genero}</span>
                </div>
            </InfoDialog>
        </div>
    ) : (
        <Loading />
    );
}