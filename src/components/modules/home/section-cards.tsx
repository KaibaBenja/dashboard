import Link from "next/link";

import { ViewsTypes } from "@/types/NavTypes";
import { adminViews } from "@/utils/roles";

function SectionViewCards({ name, icon: Icon }: ViewsTypes) {
    return (
        <Link href={`${name}`} className="flex flex-col justify-center items-center w-full md:w-[300px] h-[300px] bg-green-200 rounded-md hover:scale-105 transition-all ease-in-out duration-300">
            {Icon && (
                <Icon className="h-40 w-40 text-green-800" />
            )}
            <h1 className="capitalize text-3xl font-semibold text-green-800">
                {name}
            </h1>
        </Link>
    )
}

export function SectionViews() {
    return (
        <div className="flex flex-wrap w-full justify-between gap-4 px-2">
            {adminViews.map((data: ViewsTypes, index: number) => (
                <SectionViewCards
                    key={index}
                    name={data?.name}
                    icon={data?.icon}
                />
            ))}
        </div>
    )
}