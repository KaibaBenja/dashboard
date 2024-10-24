import { GoDotFill } from "react-icons/go";

export function Info() {
    return (
        <div className="hidden lg:flex lg:flex-col gap-4 px-2 py-4 pb-12 ml-1 bg-gray-100 shadow-md w-full rounded-md">
            <div>
                <div className="text-xl text-[#000000]">
                    <span className="text-3xl font-bold text-green-800 pr-2">
                        Existén 3 roles esenciales:
                    </span>
                    <p className="lg:ml-6">El sistema está diseñado para diferentes tipos de usuarios con roles específicos.</p>
                </div>
                <div className="lg:px-6">
                    <div>
                        <span className=" flex items-center gap-1 font-bold text-green-800">
                            <GoDotFill className="h-3 w-3" /> Admin:
                        </span>
                        <p className="ml-5">Tiene acceso completo a todas las funcionalidades, pudiendo visualizar y gestionar las configuraciones y datos críticos sobre los posts, juegos, miembros, autoridades y eventos.</p>
                    </div>
                    <div>
                        <span className="flex items-center gap-1 font-bold text-green-800">
                            <GoDotFill className="h-3 w-3" /> Desarrollador:
                        </span>
                        <p className="ml-5">Su función principal es manejar el desarrollo y mantenimiento de la informacion de los juegos y datos relacionados.</p>
                    </div>
                    <div>
                        <span className="flex items-center gap-1 font-bold text-green-800">
                            <GoDotFill className="h-3 w-3" /> Comunicación:
                        </span>
                        <p className="ml-5">Encargado de gestionar la información pública, como publicaciones y eventos, manteniendo una comunicación fluida con los usuarios finales.</p>
                    </div>
                </div>
            </div>
            <div className="text-xl text-[#000000]">
                <span className="text-3xl font-bold text-green-800 pr-2">
                    Tiene 4 Funcionalidades Claves
                </span>
                <p className="lg:ml-6">
                    Editar información existente, leer y visualizar datos, y eliminar aquellos que ya no sean necesarios,
                    todo directamente desde la base de datos. Estas acciones facilitan una administración autonoma eficaz y rápida de los datos
                    almacenados.
                </p>
            </div>
            <div>
                <div className="text-xl text-[#000000]">
                    <span className="text-3xl font-bold text-green-800 pr-2">
                        Hay 5 tableros de control:
                    </span>
                    <p className="lg:ml-6">El sistema centraliza la gestión de cinco categorías de datos importantes.</p>
                </div>
                <div className="lg:px-6">
                    <div>
                        <span className="flex items-center gap-1 font-bold text-green-800">
                            <GoDotFill className="h-3 w-3" /> Posts:
                        </span>
                        <p className="ml-5">
                            Para gestionar publicaciones y noticias relevantes.
                        </p>
                    </div>
                    <div>
                        <span className="flex items-center gap-1 font-bold text-green-800">
                            <GoDotFill className="h-3 w-3" /> Juegos:
                        </span>
                        <p className="ml-5">
                            Donde se manejan los detalles y archivos de los juegos en desarrollados en SuSTI para publicarse en el gamecenter.
                        </p>
                    </div>
                    <div>
                        <span className="flex items-center gap-1 font-bold text-green-800">
                            <GoDotFill className="h-3 w-3" /> Miembros:
                        </span>
                        <p className="ml-5">
                            Para administrar la información de los miembros del equipo de la SuSTI.
                        </p>
                    </div>
                    <div>
                        <span className="flex items-center gap-1 font-bold text-green-800">
                            <GoDotFill className="h-3 w-3" /> Autoridades:
                        </span>
                        <p className="ml-5">
                            Sección dedicada a gestionar perfiles de autoridades gubernamentales que influyen.
                        </p>
                    </div>
                    <div>
                        <span className="flex items-center gap-1 font-bold text-green-800">
                            <GoDotFill className="h-3 w-3" /> Eventos:
                        </span>
                        <p className="ml-5">
                            Permite organizar y gestionar eventos relacionados con la SuSTI.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}