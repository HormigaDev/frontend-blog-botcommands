'use client';

import { useEffect, useRef, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { makeStyles } from '@/utils/makeStyles';
import { notify } from '@/utils/notify';

interface MarkdownProps {
    content?: string;
}

const Markdown = ({ content = '' }: MarkdownProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        remark()
            .use(html)
            .process(content)
            .then((processedContent) => {
                setHtmlContent(processedContent.toString());
                setLoading(false);
            });
    }, [content]);

    useEffect(() => {
        if (!containerRef.current || !htmlContent) return;

        containerRef.current.innerHTML = htmlContent;
        const tempDiv = containerRef.current;

        tempDiv.querySelectorAll('blockquote').forEach((el) => {
            el.classList.add('border-l-4', 'border-primary', 'pl-4', 'italic', 'text-neutral-dark');
        });

        tempDiv.querySelectorAll('ul').forEach((el) => el.classList.add('list-disc', 'pl-6'));
        tempDiv.querySelectorAll('ol').forEach((el) => el.classList.add('list-decimal', 'pl-6'));
        tempDiv
            .querySelectorAll('h1')
            .forEach((el) => el.classList.add('text-5xl', 'font-bold', 'mt-4', 'mb-2'));
        tempDiv
            .querySelectorAll('h2')
            .forEach((el) => el.classList.add('text-3xl', 'font-bold', 'mt-4', 'mb-2'));
        tempDiv
            .querySelectorAll('h3')
            .forEach((el) => el.classList.add('text-2xl', 'font-semibold', 'mt-3', 'mb-2'));
        tempDiv
            .querySelectorAll('h4')
            .forEach((el) => el.classList.add('text-xl', 'font-semibold', 'mt-3', 'mb-2'));
        tempDiv
            .querySelectorAll('h5')
            .forEach((el) => el.classList.add('text-lg', 'font-medium', 'mt-2', 'mb-1'));
        tempDiv
            .querySelectorAll('h6')
            .forEach((el) => el.classList.add('text-base', 'font-medium', 'mt-2', 'mb-1'));
        tempDiv
            .querySelectorAll('a')
            .forEach((el) => el.classList.add('text-primary', 'hover:underline'));

        tempDiv.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block as HTMLElement);

            const text = block.textContent || '';

            const copyButton = document.createElement('button');
            copyButton.classList.add(
                'absolute',
                'top-0',
                'right-0',
                'm-2',
                'text-neutral',
                'px-2',
                'py-1',
                'rounded',
                'fa',
                'fa-copy',
            );

            copyButton.setAttribute('title', 'Copiar al portapapeles');
            copyButton.setAttribute('aria-label', 'Copiar texto al portapapeles');
            copyButton.addEventListener('click', () => {
                navigator.clipboard
                    .writeText(text)
                    .then(() => {
                        copyButton.classList.remove('fa-copy', 'text-neutral');
                        copyButton.classList.add('fa-check', 'text-success');
                        setTimeout(() => {
                            copyButton.classList.remove('fa-check', 'text-success');
                            copyButton.classList.add('fa-copy', 'text-neutral');
                        }, 2000);
                        notify({ message: 'Texto copiado al portapapeles', type: 'info' });
                    })
                    .catch(() => {
                        notify({ message: 'Error al copiar al portapapeles' });
                    });
            });

            block.classList.add('relative');
            block.appendChild(copyButton);
        });

        tempDiv.querySelectorAll("code:not([class^='language'])").forEach((el) => {
            el.classList.add(
                'py-0.5',
                'px-1',
                'bg-primaryt',
                'rounded',
                'border-primary-dark',
                'border-2',
            );
        });

        tempDiv.querySelectorAll('li > p').forEach((p) => {
            const parentLi = p.parentElement;
            if (parentLi) {
                parentLi.innerHTML = p.innerHTML;
            }
        });
    }, [htmlContent]);

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full min-h-[400px] mt-8">
                <i className="fa fa-spinner fa-spin fa-3x"></i>
            </div>
        );
    }

    return (
        <div
            className={makeStyles([
                'w-full p-4 bg-secondary-dark rounded',
                'px-8 md:px-48 lg:px-96',
            ])}
            style={{ whiteSpace: 'pre-line' }}
        >
            <div ref={containerRef} />
        </div>
    );
};

export default Markdown;
