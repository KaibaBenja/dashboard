"use client";
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/AppContext';

import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { token, login } = useContext(AppContext)!;
    const router = useRouter();

    useEffect(() => {
        if (token) {
            router.push('/');
        }
    }, [token, router]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await login({ username, password });
            router.push('/');
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className='flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8"'>
            <form onSubmit={handleSubmit} className='w'>
                <div className="mx-auto max-w-sm space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Inicio de Sesión</h1>
                        <p className="text-muted-foreground">Ingrese su Nombre de Usuario, seguido de su contraseña</p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Usuario
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Contraseña
                                </label>
                            </div>
                            <div className='flex gap-2 border items-center border-gray-200'>
                            <input
                                className="flex h-10 w-full rounded-md bg-background px-3 py-2 focus:outline-none focus:ring-0"
                                type={showPassword ? "password" : "text"} value={password} onChange={(e) => setPassword(e.target.value)}  
                            />
                            {showPassword 
                                ? <FaEye 
                                        className='text-green-800 mr-3 h-6 w-6'
                                        onClick={() => setShowPassword(!showPassword)}
                                    /> 
                                : <FaEyeSlash 
                                        className='text-green-800 mr-3 h-6 w-6'
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                            }
                            </div>
                        </div>
                        <button type="submit" className='w-full bg-[#0a8537] rounded-md font-semibold text-white p-2'>Iniciar Sesión</button>
                    </div>
                </div>
            </form>
        </div>
    );
};
