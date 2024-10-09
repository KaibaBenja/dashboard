import { BiLoaderCircle } from "react-icons/bi";

export function Loading() {
    return(
        <div className='w-full h-[500px] flex justify-center items-center'>
            <BiLoaderCircle className='text-green-800 w-20 h-20 animate-spin' />
        </div>
    )
}