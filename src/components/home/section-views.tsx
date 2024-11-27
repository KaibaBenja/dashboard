import { adminViews, comunicationViews, devView, impresionView } from "@/utils/roles";
import { SectionViewsList } from "./section-list";

interface SectionViewsProps {
    userRole: string;
}

export function SectionViews({ userRole }: SectionViewsProps) {
    switch (userRole) {
        case "Admin":
            return <SectionViewsList views={adminViews} />;
        case "Comunicación":
            return <SectionViewsList views={comunicationViews} alignItems="justify-around" />;
        case "Impresiones":
            return <SectionViewsList views={impresionView} alignItems="justify-around" />;
        case "Desarrollador":
            return <SectionViewsList views={devView} alignItems="justify-start" />;
        default:
            return <SectionViewsList views={adminViews} />;
    }
}