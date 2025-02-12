'use client';
import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@/utils/makeStyles';
import Image from 'next/image';
import { useAuthStore } from '@/stores/auth.store';
import { logout } from '@/api/users/logout';
import { useRouter } from 'next/navigation';

interface NavbarProps {
    options: { route: string; name: string }[];
}

const Navbar = ({ options }: NavbarProps) => {
    const { isAuthenticated, setIsAuthenticated } = useAuthStore();
    const router = useRouter();

    function handleLogout() {
        logout().then(() => {
            setIsAuthenticated(false);
            router.push('/');
        });
    }

    return (
        <nav className="bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center space-x-2">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image alt="logo" src={'/logo.png'} width={50} height={50} />
                            <span
                                className={makeStyles([
                                    'text-2xl font-bold text-neutral',
                                    'flex items-center',
                                ])}
                            >
                                HormigaDev
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8">
                        {options.map((option, i) => (
                            <Link href={option.route} key={'option-desktop-' + i}>
                                <span className="hover:text-secondary transition-colors duration-200">
                                    {option.name}
                                </span>
                            </Link>
                        ))}
                        {isAuthenticated && (
                            <button
                                className="hover:text-secondary transition-colors duration-200"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button
                            type="button"
                            className={makeStyles([
                                'inline-flex items-center justify-center p-2',
                                'rounded-md text-neutral',
                                'hover:text-white hover:bg-primary-dark',
                                'focus:outline-none',
                                'transition-colors duration-200',
                            ])}
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={() => {
                                const menu = document.getElementById('mobile-menu');
                                if (menu) {
                                    menu.classList.toggle('hidden');
                                }
                            }}
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="hidden md:hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {options.map((option, i) => (
                        <Link href={option.route} key={'option-mobile-' + i}>
                            <span
                                className={makeStyles([
                                    'block px-3 py-2 rounded-md',
                                    'text-base font-medium',
                                    'hover:bg-primary-dark',
                                    'transition-colors duration-200',
                                ])}
                            >
                                {option.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
