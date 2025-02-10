'use client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { usePathname } from 'next/navigation';
import useMetadata from '@/stores/metadata.store';
import { Metadata } from 'next';
import _metadata from '@/app/data/metadata.json';
import Dialog from './_components/Dialog';
import PostModal from './_components/PostModal';
import _keywords from './data/keywords.json';

import CookieConset from '@/app/_components/CookieConsent';
import { useAuthStore } from '@/stores/auth.store';
import { useEffect } from 'react';
import { isAuthenticated as isAuth } from '@/api/users/isAuthenticated';
import Spinner from './_components/Spinner';
import { useLoadingStore } from '@/stores/loading.store';
import PostContentModal from './_components/PostContentModal';

const host = process.env.NEXT_PUBLIC_HOST_URL;
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
            metadata = _metadata.inicio;
            break;

        case '/posts':
            metadata = _metadata.posts;
            break;

        case '/about':
            metadata = _metadata.about;
            break;

        case '/term-of-services':
            metadata = _metadata.terms_of_services;
            break;

        case '/privacy-policy':
            metadata = _metadata.privacy_policy;
            break;

        default:
            metadata = {
                title: (defaultMetadata.title as string) || 'HormigaDev',
                description: defaultMetadata.description || 'Bienvenido a HormigaDev',
                keywords: (defaultMetadata.keywords as string[]) || [],
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
    const { metadata } = useMetadata();
    const pathname = usePathname();
    const { title, description, keywords } = getMetadata(pathname, metadata);
    const { setIsAuthenticated } = useAuthStore();
    const { loading } = useLoadingStore();

    useEffect(() => {
        isAuth().then((authenticated) => {
            if (authenticated) {
                setIsAuthenticated(true);
            }
        });
    }, []);

    useEffect(() => {
        // Si la metadata ya está en el head, no la sobrescribimos
        const titleTag = document.querySelector('title');
        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');

        if (!titleTag || !metaDescription || !metaKeywords) {
            // Si no hay metadatos previos, los agregamos
            document.title = 'HormigaDev - ' + title;
            const metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            metaDesc.content = description;
            document.head.appendChild(metaDesc);

            const metaKey = document.createElement('meta');
            metaKey.name = 'keywords';
            metaKey.content = [...keywords, ..._keywords].join(', ');
            document.head.appendChild(metaKey);
        }
    }, [title, description, keywords]);

    return (
        <html lang="en">
            <head>
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content={'HormigaDev - ' + title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={`${host}/logo.png`} />
                <meta property="og:url" content={`${host}${pathname}`} />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={'HormigaDev - ' + title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={`${host}/logo.png`} />

                <meta name="author" content="Isai Medina" />
                <link rel="canonical" href={`${host}${pathname}`} />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased max-h-screen bg-dark`}
                style={{ overflow: 'hidden' }}
            >
                {children}
                <PostModal />
                <PostContentModal />
                <Dialog />
                <CookieConset />
                <ToastContainer position="top-right" autoClose={1500} hideProgressBar={true} />
                {loading && <Spinner />}
            </body>
        </html>
    );
}
