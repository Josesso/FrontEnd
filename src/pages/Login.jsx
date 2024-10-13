import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
//import { loginUser } from "../api/users"; // Asumimos que existe esta función

export default function Login() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin } = useAuth();
    const navigate = useNavigate(); // CORREGIR AQUÍ: cambiar "navegate" a "navigate"

    const onSubmit = useCallback(async (data) => {
        try {
            setError("");
            setLoading(true);
            console.log(data);

            const response = await signin(data);
            console.log('Usuario logueado:', response.data);
            if(response.data.accessToken) navigate('/'); // CORREGIR AQUÍ: cambiar "navegate" a "navigate"
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError("Credenciales incorrectas. Por favor, intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    }, [signin, navigate]); // Agregar "signin" y "navigate" a la lista de dependencias

    return (
        <div className="flex justify-center items-center min-h-screen bg-green-950">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <img src='/logo.png' className='h-20 mx-auto' alt="Logo" />
                    <h2 className="mt-6 text-3xl font-extrabold text-primary-900">
                        Iniciar Sesión
                    </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <InputText 
                                id="email" 
                                {...register("email", { 
                                    required: "El email es requerido",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email inválido"
                                    }
                                })} 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                                aria-label="Email"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Contraseña
                            </label>
                            <InputText 
                                id="password" 
                                {...register("password", { 
                                    required: "La contraseña es requerida"
                                })} 
                                type="password" 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                placeholder="Contraseña"
                                aria-label="Contraseña"
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>
                    </div>

                    {error && <div className="text-red-500 text-center">{error}</div>}

                    <div>
                        <Button 
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            label={loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                            icon="pi pi-sign-in"
                            loading={loading}
                        />
                    </div>
                </form>
            </div>
            <Toast />
        </div>
    );
}