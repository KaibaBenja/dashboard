import { SectionViews } from "./section-cards";
import { Info } from "./info";

export function Home() {
    return (
        <div className="flex flex-col justify-center">
            <h1 className="font-semibold text-4xl text-[#66cc00]">
                Tablero dinamico del Gamecenter
            </h1>
            <div className="flex flex-col flex-wrap gap-8 mt-8">
                <SectionViews />
                <Info />
            </div>
        </div>
    )
}