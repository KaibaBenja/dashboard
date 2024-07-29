import { Button } from "../ui/button";

export function EventForm() {

    return (
        <form className="flex flex-col gap-6">
            <div className="mb-4">
                <label className="block text-gray-700">Fecha:</label>
                <input type="date" className="w-full px-4 py-2 border rounded-lg  focus:outline-green-800" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Hora:</label>
                <input type="time" className="w-full px-4 py-2 border rounded-lg  focus:outline-green-800" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Titulo:</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg  focus:outline-green-800" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Descripcion:</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg  focus:outline-green-800" />
            </div>
            <div className="col-span-2 flex justify-end">
                <Button type="submit" className="mr-2 bg-green-800 w-full">Guardar</Button>
            </div>
        </form>
    )
}