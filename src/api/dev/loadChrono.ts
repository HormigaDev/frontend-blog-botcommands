'use client';
import { notify } from '@/utils/notify';

export const loadChrono = (componentName: string = '') => {
    const start = performance.now();
    window.onload = () => {
        const end = performance.now();
        const loadTime = end - start;
        notify({
            message: `Tiempo total de carga del componente ${
                '"' + componentName + '"'
            }: ${loadTime.toFixed(2)}ms`,
            type: 'info',
        });
    };
};
