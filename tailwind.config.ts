import type { Config } from 'tailwindcss';

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: '#5865F2',
                secondary: '#2F3136',
                success: '#57F287',
                warning: '#F7B500',
                neutral: '#DCDDDE',
                error: '#DC6060',
                'primary-dark': '#4757D6',
                'secondary-dark': '#1F2125',
                'success-dark': '#44D171',
                'warning-dark': '#D39A00',
                'neutral-dark': '#AAB1B6',
                dark: '#131313',
            },
        },
    },
    plugins: [],
} satisfies Config;
