import React from 'react';

const Spinner = () => {
    return (
        <div className="fixed w-screen h-screen inset-0 flex items-center justify-center bg-secondary bg-opacity-50 z-50">
            <div className="flex items-center justify-center space-x-2">
                <i className="fas fa-spinner fa-spin text-white text-4xl"></i>
                <span className="text-white font-semibold">Cargando...</span>
            </div>
        </div>
    );
};

export default Spinner;
