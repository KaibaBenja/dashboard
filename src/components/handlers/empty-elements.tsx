import { IoAddCircleSharp } from "react-icons/io5";
import { IconType } from 'react-icons';

interface EmptyTableProps {
    tableName: string;
    Icon: IconType;
    handleClick: () => void;
}

export function EmptyTable({ tableName, Icon, handleClick }: EmptyTableProps) {
    return (
        <div className='w-full flex flex-col gap-4 justify-center items-center h-[500px] bg-green-200 text-green-800 rounded-xl'>
            <Icon className='w-52 h-52' />
            <h1 className='font-semibold'>¡No hay {tableName} actualmente!</h1>
            <button className="flex items-center gap-2 text-[#FFFFFF] rounded-lg px-4 py-2 mb-4 bg-green-800 hover:bg-green-700" onClick={handleClick}>
                <IoAddCircleSharp className="w-5 h-5" /> Agregar
            </button>
        </div>
    )
}