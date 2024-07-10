"use client"
import Image from "next/image";
import { useState } from "react";
import { GameType } from '@/types/GameTypes';
import { LuPencil } from "react-icons/lu";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { GameForm } from "@/components/forms/game-form";

export default function Details() {
    const [isOpen, setIsOpen] = useState(false);

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
                    <p className="text-muted-foreground">John Doe</p>

                </div>
            </div>
            <div className="mt-8 space-y-6">
                <div>
                    <h2 className="text-2xl font-bold">Sinopsis</h2>
                    <p className="text-muted-foreground mt-2">
                        Este informe de dashboard presenta un análisis detallado de los datos clave de la empresa. Se enfoca en
                        resaltar las tendencias, insights y oportunidades de mejora para la toma de decisiones estratégicas.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Aportes</h2>
                    <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                        <li>Visualización clara y concisa de métricas clave</li>
                        <li>Análisis de patrones y tendencias en los datos</li>
                        <li>Identificación de áreas de oportunidad para optimizar el desempeño</li>
                        <li>Recomendaciones estratégicas basadas en los hallazgos</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Objetivo</h2>
                    <p className="text-muted-foreground mt-2">
                        El objetivo de este informe es proporcionar a la alta dirección una visión integral del desempeño de la
                        empresa, con el fin de facilitar la toma de decisiones informadas y orientadas a la mejora continua.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Desarrollo</h2>
                    <p className="text-muted-foreground mt-2">
                        El informe se basa en el análisis de datos históricos de la empresa, incluyendo ventas, ingresos, costos,
                        satisfacción del cliente y otros indicadores clave. Se utilizaron técnicas de visualización de datos y
                        análisis estadístico para identificar patrones, tendencias y oportunidades de mejora.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Condiciones</h2>
                    <p className="text-muted-foreground mt-2">
                        Para la elaboración de este informe, se contó con acceso a los sistemas de información de la empresa, así
                        como la colaboración de los equipos de finanzas, marketing y operaciones.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Controles</h2>
                    <p className="text-muted-foreground mt-2">
                        Se implementaron controles de calidad y validación de datos para asegurar la integridad y precisión de la
                        información presentada en el informe.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Características</h2>
                    <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                        <li>Visualización de métricas clave en gráficos y tablas</li>
                        <li>Análisis de tendencias y patrones a lo largo del tiempo</li>
                        <li>Identificación de áreas de oportunidad y recomendaciones de mejora</li>
                        <li>Resumen ejecutivo con hallazgos y conclusiones principales</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Tecnologías</h2>
                    <p className="text-muted-foreground mt-2">
                        Para la elaboración de este informe se utilizaron herramientas de visualización de datos, análisis
                        estadístico y gestión de proyectos, incluyendo Power BI, R y Jira.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Estilo</h2>
                    <p className="text-muted-foreground mt-2">
                        El informe sigue un estilo formal y profesional, con un enfoque en la claridad, la concisión y la
                        presentación de información relevante y de alto impacto.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Género</h2>
                    <p className="text-muted-foreground mt-2">
                        Este informe se clasifica dentro del género de informes de gestión, cuyo objetivo es proporcionar a la alta
                        dirección una visión integral del desempeño de la empresa.
                    </p>
                </div>
                <div>
                    <Image
                        src="/placeholder.svg"
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