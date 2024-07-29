import { Button } from "../ui/button";

export function GameForm() {

    return (
        <form className="flex flex-col gap-6">
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium">
                        Título
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-green-800"
                        id="title"
                        placeholder="Ingresa el título del juego"
                    />
                </div>
                <div className="grid gap-2">
                    <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium">
                        Autor
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-green-800"
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
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-green-800"
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
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-green-800"
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
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-green-800"
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
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-green-800"
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
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-green-800"
                        id="education"
                        placeholder="Describe los aportes a la educación"
                    ></textarea>
                </div>
                <div className="grid gap-2">
                    <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium">
                        Aportes a la Juventud
                    </label>
                    <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-green-800"
                        id="youth"
                        placeholder="Describe los aportes a la juventud"
                    ></textarea>
                </div>
            </div>
            <div className="col-span-2 flex justify-end">
                <Button type="submit" className="mr-2 bg-green-800 w-full">Guardar</Button>
            </div>
        </form>
    )
}