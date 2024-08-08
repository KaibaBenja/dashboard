"use client"

import { useState } from 'react';
import { useFetchPosts } from '@/hooks/useFetchPosts';
import { deletePost } from '@/queries/Post';
import { PostType } from '@/types/PostTypes';

import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { SlOptions } from "react-icons/sl";
import { SheetForm } from '../table-actions/sheet-form';
import { PostForm } from '../forms/post-form';
import { IoAddCircleSharp } from 'react-icons/io5';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { IoMdSettings } from 'react-icons/io';

export function PostsTable() {
    const { posts, setPosts } = useFetchPosts();
    const [isOpen, setIsOpen] = useState(false);

    function onChangeOpen() {
        setIsOpen(!isOpen);
    }

    async function handleDelete(postId: string) {
        try {
            await deletePost(postId);
            setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
        } catch (error) {
            console.error('Failed to delete post:', error);
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
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead className="min-w-[150px]">Titulo</TableHead>
                            <TableHead className="hidden md:table-cell">Categoría</TableHead>
                            <TableHead className="hidden md:table-cell">Fecha</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post: PostType) => (
                            <TableRow key={post._id} className='flex flex-col md:flex-row md:table-row'>
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
                                            <DropdownMenuItem onClick={() => handleDelete(post._id)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                                <TableCell className="flex md:table-cell items-center gap-2 font-medium">
                                    <span className='block md:hidden'>Id: </span>{post._id}
                                </TableCell>
                                <TableCell className="flex md:table-cell items-center gap-2">
                                    <span className='block md:hidden'>Titulo: </span>{post.titulo}
                                </TableCell>
                                <TableCell className="flex md:table-cell items-center gap-2">
                                    <span className='block md:hidden'>Categoria: </span>{post.categoria}
                                </TableCell>
                                <TableCell className="flex md:table-cell items-center gap-2">
                                    <span className='block md:hidden'>Fecha: </span>{post.fecha}
                                </TableCell>
                                <TableCell className="hidden md:block text-right">
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
                                            <DropdownMenuItem onClick={() => handleDelete(post._id)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <SheetForm
                    title='Formulario de Posts'
                    descripcion='Ingresa los detalles del Posts'
                    isOpen={isOpen}
                    handleOpen={onChangeOpen}
                >
                    <PostForm />
                </SheetForm>
            </div>
        </div>
    )
}
