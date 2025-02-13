'use client';

import { useEffect, useState } from 'react';
import Button from './Button';

const CookieConsent = () => {
    const [consent, setConsent] = useState(true);

    useEffect(() => {
        const isAccepted = localStorage.getItem('cookiesAccepted');
        if (!isAccepted) {
            setConsent(false);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setConsent(true);
    };
    const rejectCookies = () => {
        localStorage.setItem('cookiesAccepted', 'false');
        setConsent(true);
    };

    if (consent) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:w-[50%] md:ml-[25%] bg-secondary text-neutral p-4 md:p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-sm md:text-base text-center md:text-left">
                    Usamos cookies para mejorar tu experiencia. ¿Aceptas el uso de cookies?
                </p>
                <div className="flex space-x-2">
                    <Button
                        label="Rechazar"
                        color="error"
                        onClick={rejectCookies}
                        ariaLabel="Rechazar las cookies"
                    />
                    <Button
                        label="Aceptar"
                        color="success"
                        onClick={acceptCookies}
                        ariaLabel="Aceptar las cookies"
                    />
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
