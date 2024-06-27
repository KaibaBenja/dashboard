import Link from "next/link"
import { TbPackage } from "react-icons/tb";
import { MdOutlineShield } from "react-icons/md";
import { LuGamepad } from "react-icons/lu";
import { TbFileText } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { TableComponent } from "./table"
import { Header } from "./header"

export function Dashboard() {


    return (
        <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 lg:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                            <TbPackage className="h-6 w-6" />
                            <span className="">Admin Dashboard</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:bg-accent hover:text-accent-foreground"
                                prefetch={false}
                            >
                                <TbFileText className="h-4 w-4" />
                                Blogs
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                                prefetch={false}
                            >
                                <LuGamepad className="h-4 w-4" />
                                Games
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                                prefetch={false}
                            >
                                <LuUsers className="h-4 w-4" />
                                Members
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                                prefetch={false}
                            >
                                <MdOutlineShield className="h-4 w-4" />
                                Authorities
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <Header />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <TableComponent />
                    <TableComponent />
                    <TableComponent />
                </main>
            </div>
        </div>
    )
}
