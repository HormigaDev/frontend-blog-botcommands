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

        default:
            metadata = _metadata.default;
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

    return (
        <html lang="en">
            <head>
                <title>{'HormigaDev - ' + title}</title>
                <meta name="description" content={description} />
                <meta name="robots" content="index, follow" />
                <meta name="keywords" content={[...keywords, ..._keywords].join(', ')} />

                <meta property="og:title" content={'HormigaDev - ' + title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={`${host}/logo.png`} />
                <meta property="og:url" content={`${host}`} />
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
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5478015309122088"
                    crossOrigin="anonymous"
                ></script>
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
