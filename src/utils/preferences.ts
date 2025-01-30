'use client';

class Preferences {
    constructor() {}

    get(key: string): any | null {
        'use client';
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    set(key: string, value: Record<string, any> | string | number | boolean): void {
        'use client';
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export const preferences = new Preferences();
