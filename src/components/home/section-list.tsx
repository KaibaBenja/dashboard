import Link from "next/link";
import cx from "classnames";

import { ViewsTypes } from "@/types/NavTypes";

interface SectionViewsListProps {
    views: ViewsTypes[];
    alignItems?: string;
}

export function SectionViewsList({ views, alignItems = "justify-between" }: SectionViewsListProps) {
    return (
        <div className={cx("flex flex-wrap w-full gap-4 px-2", alignItems)}>
            {views.map((data: ViewsTypes, index: number) => (
                <Link
                    key={index}
                    href={`${data?.name}`}
                    className="flex flex-col justify-center items-center w-full md:w-[250px] h-[250px] bg-green-200 shadow-md rounded-md hover:scale-105 transition-all ease-in-out duration-300"
                >
                    {data.icon && (
                        <data.icon className="h-40 w-40 text-green-800" />
                    )}
                    <h1 className="capitalize text-3xl font-semibold text-green-800">
                        {data?.name}
                    </h1>
                </Link>
            ))}
        </div>
    );
}
