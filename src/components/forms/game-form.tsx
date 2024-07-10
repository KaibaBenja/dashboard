"use client"
import { useState } from "react";
import { Button } from "../ui/button";

export function GameForm() {

    return (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium">
                        Título
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="title"
                        placeholder="Ingresa el título del juego"
                    />
                </div>
                <div className="grid gap-2">
                    <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium">
                        Autor
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="author"
                        placeholder="Ingresa el nombre del autor"
                    />
                </div>
                <div className="grid gap-2">
                    <label
                        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
                    >
                        Enlace del Juego
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="game-link"
                        placeholder="Ingresa el enlace del juego"
                    />
                </div>
                <div className="grid gap-2">
                    <label
                        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
                    >
                        Sinopsis
                    </label>
                    <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="synopsis"
                        placeholder="Describe el juego"
                    ></textarea>
                </div>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <label
                        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
                    >
                        Aportes al Turismo
                    </label>
                    <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="tourism"
                        placeholder="Describe los aportes al turismo"
                    ></textarea>
                </div>
                <div className="grid gap-2">
                    <label
                        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
                    >
                        Aportes a la Cultura
                    </label>
                    <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Describe los aportes a la cultura"
                    ></textarea>
                </div>
                <div className="grid gap-2">
                    <label
                        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
                    >
                        Aportes a la Educación
                    </label>
                    <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="education"
                        placeholder="Describe los aportes a la educación"
                    ></textarea>
                </div>
                <div className="grid gap-2">
                    <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium">
                        Aportes a la Juventud
                    </label>
                    <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="youth"
                        placeholder="Describe los aportes a la juventud"
                    ></textarea>
                </div>
            </div>
            <div className="col-span-2 flex justify-end">
                <Button type="submit" className="mr-2">Guardar</Button>
                <Button type="button" variant="outline">Cancelar</Button>
            </div>
        </form>
    )
}