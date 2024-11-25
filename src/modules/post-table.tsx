"use client";

import { useState, useEffect } from 'react';

import { FetchAllData } from '@/queries/FetchAllData';
import { DeleteData } from '@/queries/DeleteData';
import { PostType } from '@/types/PostTypes';

import { PostForm } from '../components/forms/post-form';
import { ActionCell } from '../components/table-actions/actions-cell';
import { SheetForm } from '../components/table-actions/sheet-form';
import { InfoDialog } from '../components/table-actions/info-card';
import { CarouselImage } from '../components/table-actions/carousel-image';
import { EmptyTable } from '../components/handlers/empty-elements';
import { Loading } from '../components/handlers/loading';
import { Pagination } from '@/components/table-actions/paginado';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useToast } from '@/components/ui/use-toast';

import { IoAddCircleSharp } from 'react-icons/io5';
import { FaCalendarCheck } from 'react-icons/fa';
import { BsFileEarmarkPost } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { MdOutlineTextFields } from "react-icons/md";
import { HiIdentification } from "react-icons/hi";

export function PostsTable() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [warning, setWarning] = useState<boolean>(false);
    const [currentPostId, setCurrentPostId] = useState<string>("");
    const [actionForm, setActionForm] = useState<boolean>(false);
    const [currentPost, setCurrentPost] = useState<PostType | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { toast } = useToast();
    const itemsPerPage: number = 5;
    const isTableEmpty = Boolean(posts.length > 0);

    useEffect(() => {
        async function loadPosts() {
            setIsLoading(true);
            try {
                const updatedPosts = await FetchAllData("posts");
                setPosts(updatedPosts);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadPosts();
    }, []);

    function onAddClick() {
        setIsOpen(true);
        setActionForm(false);
        setCurrentPost(null);
    }

    function onEditClick(post: PostType) {
        setIsOpen(true);
        setActionForm(true);
        setCurrentPost(post);
        setCurrentPostId(post?._id);
    }

    function onViewClick(post: PostType) {
        setCurrentPost(post);
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

    async function handleDelete(postId: string) {
        try {
            await DeleteData("posts", postId);
            setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
            toast({
                variant: "success",
                title: `Exito!`,
                description: `El Post ${postId} fue eliminado`,
            });
        } catch (error) {
            console.error('Failed to delete post:', error);
            toast({
                variant: "destructive",
                title: `Error!`,
                description: `Ocurrio un error al intentar eliminar al elemento ${postId} (${error})`,
            });
        } finally {
            setInfoDialogOpen(false)
        }
    }

    async function refreshPosts() {
        try {
            const updatedPosts = await FetchAllData("posts");
            setPosts(updatedPosts);
        } catch (error) {
            console.error('Failed to fetch post:', error);
        }
    }

    const indexOfLastMember: number = currentPage * itemsPerPage;
    const indexOfFirstMember: number = indexOfLastMember - itemsPerPage;
    const currentPosts: PostType[] = posts.slice(indexOfFirstMember, indexOfLastMember);

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
                                        <TableHead className="hidden md:table-cell">Categoria</TableHead>
                                        <TableHead className="hidden md:table-cell">Fecha</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentPosts.map((post: PostType, index: number) => (
                                        <TableRow key={post?._id} className='flex flex-col md:flex-row md:table-row'>
                                            <TableCell className="flex md:table-cell items-center gap-2 font-medium">
                                                <span className='block md:hidden'>Id: </span>{post?._id}
                                            </TableCell>
                                            <TableCell className="flex md:table-cell md:items-center gap-2">
                                                <span className='block md:hidden'>Título: </span>{post?.titulo}
                                            </TableCell>
                                            <TableCell className="flex md:table-cell items-center gap-2">
                                                <span className='block md:hidden'>Categoria: </span>{post?.categoria}
                                            </TableCell>
                                            <TableCell className="flex md:table-cell items-center gap-2">
                                                <span className='block md:hidden'>Fecha: </span>{post?.fecha}
                                            </TableCell>
                                            <ActionCell
                                                data={post}
                                                index={`Post ${index + 1}`}
                                                closeWarning={warning && currentPostId === post?._id}
                                                handleCloseWarning={handleWarning}
                                                takeCurrentId={() => setCurrentPostId(post?._id)}
                                                currentId={currentPostId}
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
                        tableName='Posts'
                        Icon={BsFileEarmarkPost}
                        handleClick={onAddClick}
                    />
                )}
            {posts.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalItems={posts.length}
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
                <PostForm
                    updateID={currentPostId}
                    formAction={actionForm}
                    formData={currentPost}
                    handleCloseSheet={handleCloseForm}
                    onSubmitSuccess={refreshPosts}
                />
            </SheetForm>
            <InfoDialog
                openCard={infoDialogOpen}
                openWarning={warning}
                handleOpenCard={() => setInfoDialogOpen(false)}
                handleWarning={handleWarning}
                data={currentPost}
                takeCurrentId={() => setCurrentPostId(currentPost?._id!)}
                currentId={currentPostId}
                deleteActionCell={handleDelete}
                editActionCell={onEditClick}
            >
                <CarouselImage
                    images={currentPost?.blog_images!}
                />
                <h1 className='text-start font-bold text-xl'>{currentPost?.titulo}</h1>
                <div className='bg-gray-100 rounded-md p-2 pb-12 mt-4 flex flex-col justify-center font-semibold'>
                    <div className='flex items-center gap-2 mt-2'>
                        <HiIdentification className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentPost?._id}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <BiSolidCategory className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentPost?.categoria}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <FaCalendarCheck className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentPost?.fecha}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <MdOutlineTextFields className='w-5 h-5 text-green-800' />
                        <h3>Pre Descripción</h3>
                    </div>
                    <span className='capitalize'>• {currentPost?.pie_noticia}</span>
                    <div className='flex items-center gap-2 mt-2'>
                        <MdOutlineTextFields className='w-5 h-5 text-green-800' />
                        <h3>Descripción</h3>
                    </div>
                    {currentPost?.parrafos_noticia.map((parrafo: string, index: number) => (
                        <span key={index} className='capitalize'>• {parrafo}</span>
                    ))}
                </div>
            </InfoDialog>
        </div>
    ) : (
        <Loading />
    );
}