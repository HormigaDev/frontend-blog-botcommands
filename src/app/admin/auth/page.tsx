'use client';
import { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Input from '../../_components/Input';
import Button from '../../_components/Button';
import Thumbnail from '../../_components/Thumbnail';
import { notify } from '@/utils/notify';
import { login } from '@/api/users/login';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/api/users/isAuthenticated';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        isAuthenticated().then((authenticated) => {
            if (authenticated) {
                router.push('/admin/dashboard');
                return;
            }
        });
    }, [router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            notify({ message: 'Por favor informe el correo electrónico.', type: 'error' });
            return;
        }
        if (!password) {
            notify({ message: 'Por favor informe la contraseña.', type: 'error' });
            return;
        }

        login({ email, password }, () => {
            router.push('/posts');
        })
            .then((statusCode) => {
                switch (statusCode as number) {
                    case 403:
                        notify({ message: '¡Operación no permitida!', type: 'error' });
                        break;
                    case 401:
                        notify({ message: 'Credenciales inválidas', type: 'error' });
                        break;
                    case 400:
                        notify({ message: 'Error en los datos de entrada', type: 'error' });
                        break;
                }
            })
            .catch(() => null);
    };

    return (
        <AdminLayout>
            <div className="flex justify-center items-center w-full h-screen bg-dark">
                <div className="bg-secondary-dark p-8 rounded-lg shadow-lg w-full max-w-md">
                    <Thumbnail alt="Logotipo HormigaDev" src="/logo.png" />
                    <h2 className="text-primary text-2xl font-semibold mb-6 text-center">
                        Iniciar sesión
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <Input
                                id="login-email"
                                type="email"
                                label="Correo Electrónico"
                                placeholder="example@example.com"
                                onChange={(e) => setEmail(String(e.target.value))}
                                value={email}
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                id="login-password"
                                type="password"
                                label="Contraseña"
                                placeholder="********"
                                onChange={(e) => setPassword(String(e.target.value))}
                                value={password}
                                className="bg-secondary-dark"
                            />
                        </div>
                        <div className="w-full text-center">
                            <Button label="Iniciar sesión" onClick={handleSubmit} />
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default LoginPage;
