'use client';
import React, { useEffect, useState } from 'react';
import 'react-toastify/ReactToastify.css';
import '../globals.css';
import { usePathname } from 'next/navigation';
import useMetadata from '@/stores/metadata.store';
import { Metadata } from 'next';
import { makeStyles } from '@/utils/makeStyles';
import _metadata from '@/app/data/metadata.json';
import navOptions from '@/app/data/navbar-options.json';

// Components
import Navbar from '@/app/_components/Navbar';
import Footer from '@/app/_components/Footer';
import { useAuthStore } from '@/stores/auth.store';

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
    const { isAuthenticated } = useAuthStore();
    const { metadata } = useMetadata();
    const pathname = usePathname();
    const { keywords } = getMetadata(pathname, metadata);
    useEffect(() => {
        if (keywords.includes('404')) {
            setIs404(true);
        }
    }, [setIs404, keywords]);

    return (
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

            <div
                className={makeStyles([
                    'row-start-2 col-start-1',
                    is404 || isAuthenticated ? 'col-span-3' : 'col-span-2',
                    'p-4 overflow',
                    'dark',
                ])}
            >
                <main>{children}</main>
                <Footer />
            </div>

            {!is404 && !isAuthenticated && (
                <aside className="hidden lg:block row-start-2 col-start-3 bg-secondary-dark p-4">
                    <script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5478015309122088"
                        crossOrigin="anonymous"
                    ></script>
                    <ins
                        className="adsbygoogle h-full"
                        style={{ display: 'block' }}
                        data-ad-client="ca-pub-5478015309122088"
                        data-ad-slot="5548058345"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                    ></ins>
                    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                </aside>
            )}
        </div>
    );
}
