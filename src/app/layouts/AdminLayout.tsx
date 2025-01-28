'use client';
import React from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import { usePathname } from 'next/navigation';
import useMetadata from '@/stores/metadata.store';
import { Metadata } from 'next';

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
        case '/admin/auth':
            metadata = {
                title: 'Login',
                description: 'Inicia sesión',
                keywords: ['login', 'usuario'],
            };
            break;
        case '/admin/dashboard':
            metadata = {
                title: 'Panel Administrativo',
                description: 'Accede al panel de administración',
                keywords: ['admin', 'dashboard'],
            };
            break;
        default:
            metadata = {
                title: 'HormigaDev',
                description: 'Blog y recursos para desarrolladores',
                keywords: ['desarrollador', 'programación', 'blog'],
            };
            break;
    }

    if (defaultMetadata.title) metadata.title = defaultMetadata.title as string;
    if (defaultMetadata.description) metadata.description = defaultMetadata.description;
    if (defaultMetadata.keywords) metadata.keywords = defaultMetadata.keywords as string[];

    return metadata;
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { metadata } = useMetadata();
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
                <meta property="og:image" content="/logo.png" />
                <meta property="og:url" content="/" />
                <meta property="og:type" content="website" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark`}
                style={{ overflow: 'hidden' }}
            >
                <div className="min-h-screen">
                    <main>{children}</main>
                </div>
            </body>
        </html>
    );
}
