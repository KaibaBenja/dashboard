export function Hero() {
    return (
        <div className="">
            <h1 className="font-semibold text-4xl text-[#66cc00]">
                Tablero dinamico del Gamecenter
            </h1>
            <div className="px-4 py-2 mt-2 ml-1 bg-gray-100 w-fit rounded-md">
                <p className="text-lg text-[#000000]">
                    <span className="text-2xl font-semibold">4 Multiples funcionalidades:</span> Agregar, editar, leer y eliminar todo tipo de datos directos de la base de datos</p>
                <p className="text-lg text-[#000000]">
                    <span className="text-2xl font-semibold">3 Roles esenciales:</span> Admin, Developer y Comunicacion
                </p>
                <p className="text-lg text-[#000000]">
                    <span className="text-2xl font-semibold">5 tablas de control:</span> Posts, Juegos, Miembros, Autoridades y Eventos
                </p>
            </div>
            <div className="flex flex-wrap gap-6 mt-6 px-2">
                <div className="flex justify-center items-center w-[300px] h-[300px] bg-gray-200 rounded-md">
                    Proximamente
                </div>
                <div className="flex justify-center items-center w-[300px] h-[300px] bg-gray-200 rounded-md">
                    Proximamente
                </div>
                <div className="flex justify-center items-center w-[300px] h-[300px] bg-gray-200 rounded-md">
                    Proximamente
                </div>
            </div>
        </div>
    )
}