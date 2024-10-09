"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import cx from "classnames";
import { FetchAllData } from '@/queries/FetchAllData';
import { DeleteData } from '@/queries/DeleteData';
import { PostType } from '@/types/PostTypes';

import { ActionCell } from '../table-actions/actions-cell';
import { SheetForm } from '../table-actions/sheet-form';
import { InfoDialog } from '../table-actions/info-card';
import { ListSkeleton } from '../table-actions/item-skeleton';
import { PostForm } from '../forms/post-form';

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { IoAddCircleSharp } from 'react-icons/io5';
import { FaArrowCircleLeft, FaArrowCircleRight, FaBriefcase, FaCalendarCheck } from 'react-icons/fa';
import { MdOutlineTextFields } from "react-icons/md";
import { HiIdentification } from "react-icons/hi";

export function PostsTable() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [warning, setWarning] = useState<boolean>(false);
    const [currentPostId, setCurrentPostId] = useState<string>("");
    const [actionForm, setActionForm] = useState<boolean>(false);
    const [currentPost, setCurrentPost] = useState<PostType | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
    const itemsPerPage: number = 5;

    useEffect(() => {
        async function loadPosts() {
            try {
                setLoading(true);
                const updatedPosts = await FetchAllData("posts");
                setPosts(updatedPosts);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setLoading(false);
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
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    }

    async function refreshPosts() {
        try {
            setLoading(true);
            const updatedPosts = await FetchAllData("posts");
            setPosts(updatedPosts);
        } catch (error) {
            console.error('Failed to fetch post:', error);
        } finally {
            setLoading(false);
        }
    }

    const indexOfLastMember: number = currentPage * itemsPerPage;
    const indexOfFirstMember: number = indexOfLastMember - itemsPerPage;
    const currentPosts: PostType[] = posts.slice(indexOfFirstMember, indexOfLastMember);

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
                                {currentPosts.map((post: PostType, index: number) => (
                                    <TableRow key={post?._id} className='flex flex-col md:flex-row md:table-row'>
                                        <TableCell className="flex md:table-cell items-center gap-2 font-medium">
                                            <span className='block md:hidden'>Id: </span>{post?._id}
                                        </TableCell>
                                        <TableCell className="flex md:table-cell items-center gap-2">
                                            <span className='block md:hidden'>Titulo: </span>{post?.titulo}
                                        </TableCell>
                                        <TableCell className="flex md:table-cell items-center gap-2">
                                            <span className='block md:hidden'>Fecha: </span>{post?.fecha}
                                        </TableCell>
                                        <TableCell className="flex md:table-cell items-center gap-2">
                                            <span className='block md:hidden'>Categoria: </span>{post?.categoria}
                                        </TableCell>
                                        <ActionCell
                                            data={post}
                                            index={`Miembro ${index + 1}`}
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
                        )}
                    </Table>
                </div>
            </div>
            {Boolean(posts.length > 5) &&
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
                        {currentPage} - {Math.ceil(posts.length / itemsPerPage)}
                    </span>
                    <button
                        disabled={currentPage === Math.ceil(posts.length / itemsPerPage)}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className={cx({
                            "text-gray-300 cursor-not-allowed": Boolean(currentPage === Math.ceil(posts.length / itemsPerPage)),
                            "text-green-800": !Boolean(currentPage === Math.ceil(posts.length / itemsPerPage))
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
                <Image
                    src={`${currentPost?.blog_images}`}
                    alt="example"
                    width={80}
                    height={80}
                    className='rounded-full object-cover self-center my-4'
                />
                <h1 className='text-start font-bold text-xl'>{currentPost?.titulo}</h1>
                <div className='bg-gray-100 rounded-md p-2 mt-4 flex flex-col justify-center font-semibold'>
                    <div className='flex items-center gap-2 mt-2'>
                        <HiIdentification className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentPost?._id}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <FaCalendarCheck className='w-5 h-5 text-green-800' />
                        <span className='capitalize'>{currentPost?.fecha}</span>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <MdOutlineTextFields className='w-5 h-5 text-green-800' />
                        <h3>Pre Descripción</h3>
                    </div>
                    <span className='capitalize'>• {currentPost?.pre_descripcion}</span>
                    <div className='flex items-center gap-2 mt-2'>
                        <MdOutlineTextFields className='w-5 h-5 text-green-800' />
                        <h3>Descripción</h3>
                    </div>
                    <span className='capitalize'>• {currentPost?.descripcion}</span>
                </div>
            </InfoDialog>
        </div>
    );
}