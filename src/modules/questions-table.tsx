"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { FetchAllData } from '@/queries/FetchAllData';
import { DeleteData } from '@/queries/DeleteData';

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
import { QuestionType } from '@/types/QuestionTypes';
import { QuestionForm } from '@/components/forms/questions-form';
import { FetchDataById } from '@/queries/FetchDataById';
import { QuestionsActionCell } from '@/components/table-actions/questions-actions-cell';

export function QuestionsTable() {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [warning, setWarning] = useState<boolean>(false);
    const [currentQuestionId, setCurrentQuestionId] = useState<string>("");
    const [actionForm, setActionForm] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { toast } = useToast();
    const itemsPerPage: number = 5;
    const isTableEmpty = Boolean(questions.length > 0);

    useEffect(() => {
        async function loadQuestions() {
            setIsLoading(true);
            try {
                const updateQuestions = await FetchAllData("questions/id");
                setQuestions(updateQuestions);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadQuestions();
    }, []);


    function onAddClick() {
        setIsOpen(true);
        setActionForm(false);
        setCurrentQuestion(null);
    }

    function onEditClick(question: QuestionType) {
        setIsOpen(true);
        setActionForm(true);
        setCurrentQuestion(question);
        setCurrentQuestionId(question?.id)
    }

    function onViewClick(question: QuestionType) {
        setCurrentQuestion(question);
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
            await DeleteData("questions", authorityId);
            setQuestions(prevAuthority => prevAuthority.filter(authority => authority.id !== authorityId));
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

    async function refreshQuestions() {
        try {
            const updatedQuestions = await FetchAllData("questions/id");
            setQuestions(updatedQuestions);
        } catch (error) {
            console.error('Failed to fetch question:', error);
        }
    }

    const indexOfLastMember: number = currentPage * itemsPerPage;
    const indexOfFirstMember: number = indexOfLastMember - itemsPerPage;
    const currentQuestions: QuestionType[] = questions.slice(indexOfFirstMember, indexOfLastMember);

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
                                    {currentQuestions.map((authority: QuestionType, index: number) => (
                                        <TableRow key={authority?.id} className='flex flex-col md:flex-row md:table-row'>
                                            <TableCell className="flex md:table-cell items-center gap-2">
                                                <span className='block md:hidden'>Nombre: </span>{authority?.question}
                                            </TableCell>
                                            <TableCell className="flex md:table-cell items-center gap-2">
                                                <span className='block md:hidden'>Puesto: </span>{authority?.catName}
                                            </TableCell>
                                            <QuestionsActionCell
                                                data={authority}
                                                index={`Autoridad ${index + 1}`}
                                                closeWarning={warning && currentQuestionId === authority?.id}
                                                handleCloseWarning={handleWarning}
                                                takeCurrentId={() => setCurrentQuestionId(authority?.id)}
                                                currentId={currentQuestionId}
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
            {questions.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalItems={questions.length}
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
                <QuestionForm
                    updateID={currentQuestionId}
                    formAction={actionForm}
                    formData={currentQuestion}
                    handleCloseSheet={handleCloseForm}
                    onSubmitSuccess={refreshQuestions}
                />
            </SheetForm>
            <InfoDialog
                openCard={infoDialogOpen}
                openWarning={warning}
                handleOpenCard={() => setInfoDialogOpen(false)}
                handleWarning={handleWarning}
                data={currentQuestion}
                takeCurrentId={() => setCurrentQuestionId(currentQuestion?.id!)}
                currentId={currentQuestionId}
                deleteActionCell={handleDelete}
                editActionCell={onEditClick}
            >
                <div className='bg-gray-100 rounded-md p-2 mt-4 flex flex-col justify-center font-semibold'>
                    <div className='flex items-center gap-2 mt-2'>
                        <HiIdentification className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentQuestion?.id}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <FaBriefcase className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentQuestion?.question}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <PiRankingFill className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentQuestion?.answers[currentQuestion.correctAnswerIndex]}</span>
                    </div>
                </div>
            </InfoDialog>
        </div>
    ) : (
        <Loading />
    );
}