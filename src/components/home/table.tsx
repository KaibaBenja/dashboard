"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { SlOptions } from "react-icons/sl";
import { useState } from "react";


export function TableComponent() {
    const [isOpen, setIsOpen] = useState(false)
    const [victoryActive, setVictoryActive] = useState(false);
    const [subcategories, setSubcategories] = useState(0);

    const handleVictoryClick = () => {
        setVictoryActive(!victoryActive);
    }

    const handleSubcategoriesChange = (e: any) => {
        setSubcategories(Number(e.target.value));
    };

    function onChangeOpen() {
        setIsOpen(!isOpen)
    }

    return (
        <div className="border shadow-sm rounded-lg p-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead className="min-w-[150px]">Title</TableHead>
                        <TableHead className="hidden md:table-cell">Author</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">#1</TableCell>
                        <TableCell>Introducing the New Product Line</TableCell>
                        <TableCell className="hidden md:table-cell">John Doe</TableCell>
                        <TableCell className="hidden md:table-cell">May 15, 2023</TableCell>
                        <TableCell className="text-right">
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
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">#2</TableCell>
                        <TableCell>Tips for Improving Website Performance</TableCell>
                        <TableCell className="hidden md:table-cell">Jane Smith</TableCell>
                        <TableCell className="hidden md:table-cell">April 30, 2023</TableCell>
                        <TableCell className="text-right">
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
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">#3</TableCell>
                        <TableCell>Mastering React Hooks</TableCell>
                        <TableCell className="hidden md:table-cell">Michael Johnson</TableCell>
                        <TableCell className="hidden md:table-cell">March 20, 2023</TableCell>
                        <TableCell className="text-right">
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
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 ">Fecha:</label>
                            <input type="date" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 ">Hora:</label>
                            <input type="time" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 ">Titulo:</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 ">Descripcion:</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}