'use client';
import React from 'react';
import '@/app/globals.css';

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen">
            <main>{children}</main>
        </div>
    );
}
