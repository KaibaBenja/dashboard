import Link from "next/link";
import { PiArrowFatUpFill } from "react-icons/pi";

export function UpButton() {
    return(
        <Link href="#header" className="fixed lg:hidden bottom-12 right-12 z-50 p-2 rounded-md bg-green-800 hover:bg-green-700 text-[#FFFFFF]">
            <PiArrowFatUpFill  className="w-5 h-5"/>
        </Link>
    )
}