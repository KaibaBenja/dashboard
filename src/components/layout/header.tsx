import { IoAddCircleSharp } from "react-icons/io5";

interface HeaderProps {
    section: string;
}

export function Header({ section }: HeaderProps) {

    return (
        <header className="flex h-14 lg:h-[80px] bg-[#66cc00] items-center gap-4 border-b bg-muted/40 px-6">
            <div className="flex-1">
                <h1 className="font-bold font-mono text-[#FFFFFF] text-2xl">{section}</h1>
            </div>
            <button className="flex items-center gap-2 text-[#FFFFFF] rounded-lg px-4 py-2 bg-green-800 hover:bg-green-700">
                <IoAddCircleSharp className="w-5 h-5" /> Agregar
            </button>
        </header>
    )
}
