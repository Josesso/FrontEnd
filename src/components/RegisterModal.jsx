import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { registerUser } from "../api/users";

export default function RegisterModal() {
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = useCallback(async (data) => {
        try {
            setError("");
            setSuccess(false);
            // Aquí podrías añadir una función de hash para la contraseña
            const response = await registerUser(data);
            console.log('Usuario creado:', response.data);
            reset();
            setSuccess(true);
            setTimeout(() => setVisible(false), 2000);
            setTimeout(() => {
                window.location.reload(); // Recargar la página
              }, 500);
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            setError("Hubo un error al registrar el usuario. Por favor, intenta de nuevo.");
        }
    }, [reset]);

    const hideDialog = useCallback(() => {
        if (visible) {
            setVisible(false);
            setError("");
            setSuccess(false);
            reset();
        }
    }, [visible, reset]);

    return (
        <div className="card flex justify-end my-2">
            <Button label="Registrar" icon="pi pi-user-plus" onClick={() => setVisible(true)} />
            <Dialog
                visible={visible}
                modal
                onHide={hideDialog}
                content={() => (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        <div className="flex items-center justify-center h-16 w-full">
                            <img src='/logo.png' className='h-20' alt="Logo" />
                        </div>
                        <div className="inline-flex flex-col gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                Nombre de Usuario
                            </label>
                            <InputText 
                                id="username" 
                                {...register("username", { required: "El nombre de usuario es requerido" })} 
                                className="bg-slate-100 border-none p-3 text-primary-900" 
                                aria-label="Nombre de Usuario"
                            />
                            {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                        </div>
                        <div className="inline-flex flex-col gap-2">
                            <label htmlFor="email" className="text-primary-50 font-semibold">
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
                                className="bg-slate-100 border-none p-3 text-primary-900" 
                                aria-label="Email"
                            />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>
                        <div className="inline-flex flex-col gap-2">
                            <label htmlFor="password" className="text-primary-50 font-semibold">
                                Contraseña
                            </label>
                            <InputText 
                                id="password" 
                                {...register("password", { 
                                    required: "La contraseña es requerida",
                                    minLength: {
                                        value: 8,
                                        message: "La contraseña debe tener al menos 8 caracteres"
                                    }
                                })} 
                                type="password" 
                                className="bg-slate-100 border-none p-3 text-primary-900" 
                                aria-label="Contraseña"
                            />
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </div>
                        {error && <div className="text-red-500">{error}</div>}
                        {success && <div className="text-green-500">Usuario registrado con éxito</div>}
                        <div className="flex items-center gap-2">
                            <Button label="Registrar" type="submit" className="p-3 w-full text-primary-50 border-1 border-slate-200 hover:bg-slate-100" />
                            <Button label="Cancelar" onClick={hideDialog} className="p-3 w-full text-primary-50 border-1 border-slate-200 hover:bg-slate-100" />
                        </div>
                    </form>
                )}
            />
            <Toast />
        </div>
    );
}