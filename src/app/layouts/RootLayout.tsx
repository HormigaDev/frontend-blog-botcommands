'use client';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { usePathname } from 'next/navigation';
import useMetadata from '@/stores/metadata.store';
import { Metadata } from 'next';
import { makeStyles } from '@/utils/makeStyles';
import _metadata from '@/app/data/metadata.json';
import navOptions from '@/app/data/navbar-options.json';
import Dialog from '../_components/Dialog';
import PostModal from '../_components/PostModal';

// Components
import Navbar from '@/app/_components/Navbar';
import Footer from '@/app/_components/Footer';
import CookieConset from '@/app/_components/CookieConsent';
import { isAuthenticated } from '@/api/users/isAuthenticated';

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
    const [is404, setIs404] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const { metadata } = useMetadata();
    const pathname = usePathname();
    const { title, description, keywords } = getMetadata(pathname, metadata);
    useEffect(() => {
        if (keywords.includes('404')) {
            setIs404(true);
        }
        isAuthenticated().then((authenticated) => {
            if (authenticated) {
                setIsAdmin(true);
            }
        });
    }, [setIs404, keywords]);

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
                    <header className="col-span-full row-start-1 text-white">
                        <Navbar options={navOptions.mainNavbar} />
                    </header>

                    <main
                        className={makeStyles([
                            'row-start-2 col-start-1',
                            is404 || isAdmin ? 'col-span-3' : 'col-span-2',
                            'p-4 overflow',
                            'dark',
                        ])}
                    >
                        {children}
                        <Footer />
                    </main>

                    {!is404 && !isAdmin && (
                        <aside className="hidden lg:block row-start-2 col-start-3 bg-secondary-dark p-4">
                            <p>Aquí van los anuncios de GoogleAdsense</p>
                        </aside>
                    )}
                </div>
                <PostModal />
                <Dialog />
                <CookieConset />
                <ToastContainer position="top-right" autoClose={1500} hideProgressBar={true} />
            </body>
        </html>
    );
}
