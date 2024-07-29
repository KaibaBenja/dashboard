"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { GameType } from '@/types/GameTypes';
import { LuPencil } from "react-icons/lu";
import { GameForm } from "@/components/forms/game-form";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { fetchGame } from "@/queries/Games";
import notFound from "../../../images/404.jpg"


export default function Details({ params, }: { params: { detailID: string }; }) {
    const [isOpen, setIsOpen] = useState(false);
    const [game, setGame] = useState<GameType | null>(null);

    useEffect(() => {
        const getGame = async () => {
            try {
                const gameData = await fetchGame(params.detailID);
                setGame(gameData);
            } catch (error) {
                console.error("Error fetching game details", error);
            }
        };

        getGame();
    }, [params.detailID]);

    function onChangeOpen() {
        setIsOpen(!isOpen);
    }
    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto my-12 px-4 md:px-6">
            <div className="space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Informe de Dashboard</h1>
                    <div className="flex-shrink-0 rounded-full flex items-center hover:bg-slate-500 transition-colors duration-200 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium cursor-pointer" onClick={onChangeOpen}>
                        <LuPencil />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 rounded-full bg-primary text-primary-foreground px-3 py-1 text-sm font-medium">
                        Autor
                    </div>
                    <p className="text-muted-foreground">{game?.autor}</p>

                </div>
            </div>
            <div className="mt-8 space-y-6">
                <div>
                    <h2 className="text-2xl font-bold">Sinopsis</h2>
                    <p className="text-muted-foreground mt-2">
                        {game?.sinopsis}
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Aportes</h2>
                    <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                        <li>{game?.aporte_turismo}</li>
                        <li>{game?.aporte_cultura}</li>
                        <li>{game?.aporte_juventud}</li>
                        <li>{game?.aporte_educacion}</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Objetivo</h2>
                    <p className="text-muted-foreground mt-2">
                        {game?.objetivo}
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Desarrollo</h2>
                    <p className="text-muted-foreground mt-2">
                        {game?.desarrollo}
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Condiciones</h2>
                    <p className="text-muted-foreground mt-2">
                        {game?.condiciones}
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Controles</h2>
                    <p className="text-muted-foreground mt-2">
                        {game?.controles}
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Características</h2>
                    <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                        <li>{game?.caracteristicas}</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Tecnologías</h2>
                    <p className="text-muted-foreground mt-2">
                        {game?.tecnologias}
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Estilo</h2>
                    <p className="text-muted-foreground mt-2">
                        {game?.estilo}
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Género</h2>
                    <p className="text-muted-foreground mt-2">
                        {game?.genero}
                    </p>
                </div>
                <div>
                    <Image
                        src={notFound}
                        alt="Imagen representativa"
                        width={1200}
                        height={600}
                        className="rounded-lg object-cover"
                    />
                    <p className="text-sm text-muted-foreground mt-2">Imagen representativa del informe de dashboard</p>
                </div>
            </div>
        </div>
    )
}