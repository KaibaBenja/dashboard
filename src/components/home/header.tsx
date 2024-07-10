import Link from "next/link";
import { useContext } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TbPackage } from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";
import { AppContext } from '@/context/AppContext';

export function Header() {
    const { token, username, logout  } = useContext(AppContext)!;


    return (
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
            <Link href="#" className="lg:hidden" prefetch={false}>
                <TbPackage className="h-6 w-6" />
                <span className="sr-only">Home</span>
            </Link>
            <div className="flex-1">
                <h1 className="font-semibold text-lg">Blogs</h1>
            </div>
            {token && username ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <RxAvatar width="32" height="32" className="rounded-full" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{String(username)}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <RxAvatar width="32" height="32" className="rounded-full" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href="/login" className="relative flex rounded-sm px-2 py-1.5 text-sm justify-center font-semibold outline-none hover:bg-gray-300">Login</Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </header>
    )
}
