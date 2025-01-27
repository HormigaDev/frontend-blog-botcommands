'use client';

import { useEffect, useState } from 'react';
import Button from './Button';

const CookieConset = () => {
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
        <div className="fixed bottom-0 left-0 w-[50%] ml-[25%] mb-8 bg-secondary text-neutral p-8 rounded">
            <div className="flex justify-between items-center">
                <p>Usamos cookies para mejorar tu experiencia. ¿Aceptas el uso de cookies?</p>
                <div>
                    <Button
                        label="Rechazar todas"
                        color="error"
                        onClick={rejectCookies}
                        className="mr-2"
                    />
                    <Button label="Aceptar todas" color="success" onClick={acceptCookies} />
                </div>
            </div>
        </div>
    );
};

export default CookieConset;
