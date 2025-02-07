'use client';
import useMetadata from '@/stores/metadata.store';
import Link from 'next/link';
import { useEffect } from 'react';
import RootLayout from '@/app/layouts/RootLayout';

const NotFoundPage = () => {
    const { setMetadata } = useMetadata();
    useEffect(() => {
        setMetadata({
            title: '404 NOT FOUND',
            description: '¡Ups! La página que buscas no se encuentra.',
            keywords: ['not found', '404'],
        });
    }, [setMetadata]);
    return (
        <RootLayout>
            <div className="flex items-center justify-center min-h-screen bg-dark text-white">
                <div className="text-center">
                    <h1 className="text-6xl font-bold mb-4">404</h1>
                    <p className="text-xl mb-6">¡Ups! La página que buscas no se encuentra.</p>
                    <Link href="/" className="text-primary hover:text-primary-dark">
                        Regresar al inicio
                    </Link>
                </div>
            </div>
        </RootLayout>
    );
};

export default NotFoundPage;
