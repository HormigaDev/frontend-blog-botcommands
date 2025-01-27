'use client';
import useStore from '@/store';
import Link from 'next/link';
import { useEffect } from 'react';

const NotFoundPage = () => {
    const { setMetadata } = useStore();
    useEffect(() => {
        setMetadata({
            title: '404',
            description: '¡Ups! La página que buscas no se encuentra.',
            keywords: ['not found', '404'],
        });
    }, [setMetadata]);
    return (
        <div className="flex items-center justify-center min-h-screen bg-dark text-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-xl mb-6">¡Ups! La página que buscas no se encuentra.</p>
                <Link href="/" className="text-primary hover:text-primary-dark">
                    Regresar al inicio
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
