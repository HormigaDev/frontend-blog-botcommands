'use client';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { usePathname } from 'next/navigation';
import useStore from '@/store';
import { Metadata } from 'next';
import { makeStyles } from '@/utils/makeStyles';

// Components
import Navbar from './_components/Navbar';
import Footer from './_components/Footer';

const host = 'http://localhost:4000'; //TODO: Cambiar a la URL real en producción
const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const getMetadata = (pathname: string, defaultMetadata: Metadata) => {
    let metadata: { title: string; description: string; keywords: string[] } = {
        title: '',
        description: '',
        keywords: [],
    };

    switch (pathname) {
        case '/':
            metadata = {
                title: 'Inicio',
                description:
                    'Descubre las últimas novedades y ejemplos de comandos de bots en HormigaDev. Aprende a mejorar tus bots de Discord con nuestras guías y recursos.',
                keywords: [
                    'discord bots',
                    'ejemplos de comandos',
                    'guías de programación',
                    'bots en Discord',
                ],
            };
            break;

        case '/posts':
            metadata = {
                title: 'Publicaciones',
                description:
                    'Explora nuestras publicaciones repletas de ejemplos de comandos para bots de Discord. Mejora tus habilidades de programación hoy mismo.',
                keywords: [
                    'publicaciones de discord',
                    'comandos de bots',
                    'desarrollo de bots',
                    'programación avanzada',
                ],
            };
            break;

        case '/about':
            metadata = {
                title: 'Sobre nosotros',
                description:
                    'Conoce más sobre HormigaDev, un blog dedicado a ejemplos, tutoriales y recursos para el desarrollo de bots en Discord.',
                keywords: ['sobre HormigaDev', 'desarrollo de bots', 'comunidad de programadores'],
            };
            break;

        default:
            metadata = {
                title: 'Blog de programación',
                description:
                    'Bienvenido a HormigaDev, tu blog de referencia para ejemplos y tutoriales de comandos de bots en Discord.',
                keywords: [
                    'blog de programación',
                    'discord bots',
                    'tutoriales de comandos',
                    'recursos de desarrollo',
                ],
            };
            break;
    }

    if (defaultMetadata.title) metadata.title = defaultMetadata.title as string;
    if (defaultMetadata.description) metadata.description = defaultMetadata.description;
    if (defaultMetadata.keywords) metadata.keywords = defaultMetadata.keywords as string[];

    return metadata;
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { metadata } = useStore();
    const pathname = usePathname();
    const { title, description, keywords } = getMetadata(pathname, metadata);

    return (
        <html lang="en">
            <head>
                <title>{'HormigaDev - ' + title}</title>
                <meta name="description" content={description} />
                <meta name="robots" content="index, follow" />
                <meta name="keywords" content={keywords.join(', ')} />

                <meta property="og:title" content={'HormigaDev - ' + title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={`${host}/logo.png`} />
                <meta property="og:url" content="https://blog.hormiga.dev" />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={'HormigaDev - ' + title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={`${host}/logo.png`} />

                <meta name="author" content="Isai Medina" />
                <link rel="canonical" href={`${host}${pathname}`} />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
                    integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased max-h-screen bg-dark`}
                style={{ overflow: 'hidden' }}
            >
                <div
                    className={makeStyles([
                        'grid grid-cols-1 grid-rows-[auto_1fr]',
                        'min-h-screen lg:grid-cols-[250px_1fr_300px]',
                        'lg:grid-rows-[auto_1fr]',
                        'max-h-screen',
                    ])}
                >
                    {/* Navbar */}
                    <header className="col-span-full row-start-1 text-white">
                        <Navbar />
                    </header>

                    {/* Main content */}
                    <main
                        className={makeStyles([
                            'row-start-2 col-start-1',
                            'col-span-2 p-4 overflow',
                        ])}
                    >
                        {children} <Footer />
                    </main>

                    {/* Aside */}
                    <aside className="hidden lg:block row-start-2 col-start-3 bg-secondary-dark p-4">
                        <p>Contenido adicional o enlaces útiles</p>
                    </aside>
                </div>

                <ToastContainer position="top-right" autoClose={1500} hideProgressBar={true} />
            </body>
        </html>
    );
}
