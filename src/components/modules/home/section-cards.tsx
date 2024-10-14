import Link from "next/link";
import cx from "classnames";

import { adminViews, comunicationViews, devView } from "@/utils/roles";
import { ViewsTypes } from "@/types/NavTypes";

interface SectionViewsProps {
    userRole: string;
}

interface SectionViewsListProps {
    views: ViewsTypes[];
    alignItems?: string;
}

function SectionViewsList({ views, alignItems = "justify-between" }: SectionViewsListProps) {
    return (
        <div className={cx("flex flex-wrap w-full gap-4 px-2", alignItems)}>
            {views.map((data: ViewsTypes, index: number) => (
                <Link
                    key={index}
                    href={`${data?.name}`}
                    className="flex flex-col justify-center items-center w-full md:w-[300px] h-[300px] bg-green-200 shadow-md rounded-md hover:scale-105 transition-all ease-in-out duration-300"
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

export function SectionViews({ userRole }: SectionViewsProps) {
    switch (userRole) {
        case "Admin":
            return <SectionViewsList views={adminViews} />;
        case "Comunicación":
            return <SectionViewsList views={comunicationViews} alignItems="justify-around" />;
        case "Desarrollador":
            return <SectionViewsList views={devView} alignItems="justify-start" />;
        default:
            return <SectionViewsList views={adminViews} />;
    }
}