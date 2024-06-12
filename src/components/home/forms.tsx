"use client"
import { useState } from 'react';

export function Forms() {
    const [activeTab, setActiveTab] = useState('eventos');
    const [victoryActive, setVictoryActive] = useState(false);
    const [subcategories, setSubcategories] = useState(0);

    const handleVictoryClick = () => {
        setVictoryActive(!victoryActive);
    }

    const handleSubcategoriesChange = (e: any) => {
        setSubcategories(Number(e.target.value));
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="border-b border-gray-200 mb-4">
                <ul className="flex flex-wrap -mb-px" id="myTab" role="tablist">
                    <li className="mr-2" role="presentation">
                        <button
                            className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2  ${activeTab === 'eventos' ? 'text-blue-600 border-blue-600' : ''}`}
                            onClick={() => setActiveTab('eventos')}
                            id="profile-tab"
                            type="button"
                            role="tab"
                            aria-controls="profile"
                            aria-selected={activeTab === 'eventos'}
                        >
                            Eventos
                        </button>
                    </li>
                    <li className="mr-2" role="presentation">
                        <button
                            className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2   ${activeTab === 'juegos' ? 'text-blue-600 border-blue-600' : ''}`}
                            onClick={() => setActiveTab('juegos')}
                            id="dashboard-tab"
                            type="button"
                            role="tab"
                            aria-controls="dashboard"
                            aria-selected={activeTab === 'juegos'}
                        >
                            Juegos
                        </button>
                    </li>
                    <li className="mr-2" role="presentation">
                        <button
                            className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2   ${activeTab === 'noticias' ? 'text-blue-600 border-blue-600' : ''}`}
                            onClick={() => setActiveTab('noticias')}
                            id="settings-tab"
                            type="button"
                            role="tab"
                            aria-controls="settings"
                            aria-selected={activeTab === 'noticias'}
                        >
                            Noticias
                        </button>
                    </li>
                </ul>
            </div>
            <div>
                <div className={`transition-opacity duration-500 ease-in-out ${activeTab === 'noticias' ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`} id="noticias" role="tabpanel">
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 ">Titulo:</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg " />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Categoría:</label>
                            <input type="email" className="w-full px-4 py-2 border rounded-lg " />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Fecha:</label>
                            <input type="date" className="w-full px-4 py-2 border rounded-lg " />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Descripción:</label>
                            <input type="email" className="w-full px-4 py-2 border rounded-lg " />
                        </div>
                    </form>
                </div>
                <div className={`transition-opacity duration-500 ease-in-out ${activeTab === 'juegos' ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`} id="juegos" role="tabpanel">
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700">Titulo:</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Sinopsis:</label>
                            <textarea className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Aportes al Gobierno:</label>
                            <textarea className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Subcategorías:</label>
                            <select onChange={handleSubcategoriesChange} className="w-full px-4 py-2 border rounded-lg">
                                <option value="0">Seleccionar número de subcategorías</option>
                                {[...Array(10)].map((_, i) => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            {Array.from({ length: subcategories }).map((_, i) => (
                                <div key={i} className="mt-4">
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Título de Subcategoría {i + 1}:</label>
                                        <input type="text" className="w-full px-4 py-2 border rounded-lg" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Descripción de Subcategoría {i + 1}:</label>
                                        <textarea className="w-full px-4 py-2 border rounded-lg" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Objetivo General:</label>
                            <textarea className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Desarrollo del videojuego:</label>
                            <textarea className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <div className='flex gap-3 items-center mb-3'>
                                <label className=" text-gray-700">Condicion Victoria y Derrota:</label>
                                <input type="checkbox" className='size-5' onClick={handleVictoryClick} />
                            </div>
                            {victoryActive ? <textarea className="w-full px-4 py-2 border rounded-lg" /> : <textarea disabled className="w-full px-4 py-2 border rounded-lg" />}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Controles:</label>
                            <input type="file" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Tecnologia utilizada:</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Estilo:</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Género:</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                    </form>
                </div>
                <div className={`transition-opacity duration-500 ease-in-out ${activeTab === 'eventos' ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`} id="eventos" role="tabpanel">
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 ">Fecha:</label>
                            <input type="date" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 ">Hora:</label>
                            <input type="time" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 ">Titulo:</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 ">Descripcion:</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}
