"use client";

import { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FaLock, FaLockOpen } from "react-icons/fa";

const schema = yup.object().shape({
    username: yup.string().required('El usuario es requerido'),
    password: yup.string().required('La contraseña es requerida'),
});

type LoginFormInputs = {
    username: string;
    password: string;
};

export default function LoginPage() {
    const { login } = useContext(AppContext)!;
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            setLoginError(null);
            await login(data);
            router.push('/');
        } catch (error: any) {
            console.error('Error during login:', error);
            setLoginError('Credenciales incorrectas o hubo un problema con el servidor.');
        }
    };

    return (
        <div className='flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm space-y-6'>
                <div className="space-y-2 text-center">
                    <h1 className="text-4xl text-[#66cc00] font-bold">Dashboard Login</h1>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Usuario</label>
                        <input
                            {...register('username')}
                            className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ${
                                errors.username ? 'border-red-500' : 'border-input'
                            } bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium leading-none">Contraseña</label>
                        </div>
                        <div className='flex gap-2 border items-center border-gray-200'>
                            <input
                                {...register('password')}
                                className={`flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm ${
                                    errors.password ? 'border-red-500' : ''
                                } focus:outline-none focus:ring-0`}
                                type={showPassword ? "text" : "password"}
                            />
                            {showPassword
                                ? <FaLockOpen
                                    className='text-green-800 mr-3 h-6 w-6 hover:cursor-pointer'
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                                : <FaLock
                                    className='text-green-800 mr-3 h-6 w-6 hover:cursor-pointer'
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            }
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    {loginError && <p className="text-red-500 text-center">{loginError}</p>}
                    <button type="submit" className='w-full bg-[#0a8537] rounded-md font-semibold text-white p-2'>Iniciar Sesión</button>
                </div>
            </form>
        </div>
    );
}