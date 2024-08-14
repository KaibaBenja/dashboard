export function HomeComponent() {
    return (
        <div className="flex flex-col">
            <h1 className="font-semibold text-4xl text-[#66cc00]">
                Tablero de Control - GameCenter
            </h1>
            <div className="p-2">
                <p>
                    <span className="text-xl font-semibold">4 Funcionalidades:</span> Crear, Leer, Eliminar y Actualizar
                </p>
                <p>
                    <span className="text-xl font-semibold">5 Tablas:</span> Posts, Juegos, Miembros, Autoridades y Eventos
                </p>
                <p>
                    <span className="text-xl font-semibold">3 Roles:</span> Admin, Desarrollador y Comunicación
                </p>
            </div>
            <div className="flex flex-wrap gap-4">
                <div className="w-[250px] h-[250px] bg-gray-200 flex justify-center items-center rounded-md">
                    Proximamente
                </div>
                <div className="w-[250px] h-[250px] bg-gray-200 flex justify-center items-center rounded-md">
                    Proximamente
                </div>
                <div className="w-[250px] h-[250px] bg-gray-200 flex justify-center items-center rounded-md">
                    Proximamente
                </div>
            </div>
        </div>
    )
}