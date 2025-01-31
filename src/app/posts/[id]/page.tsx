'use client';
import { getPost } from '@/api/posts/getPost';
import { registerPostView } from '@/api/posts/registerPostView';
import useMetadata from '@/stores/metadata.store';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import RootLayout from '@/app/layouts/RootLayout';
import { HttpException } from '@/types/HttpException';
import { remark } from 'remark';
import html from 'remark-html';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { makeStyles } from '@/utils/makeStyles';

const Post = () => {
    const [postContent, setPostContent] = useState('');
    const [loading, setLoading] = useState(true);
    const { setMetadata } = useMetadata();
    const containerRef = useRef<HTMLDivElement>(null);

    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        if (!id || isNaN(+id)) {
            router.push('/404');
            return;
        }

        getPost(+id)
            .then(async (post) => {
                setMetadata({
                    title: post.title,
                    description: post.shortDescription,
                    keywords: post.keywords,
                });

                const processedContent = await remark().use(html).process(post.content);
                const contentHtml = processedContent.toString();
                // const html = parseMarkdownToHtml(post.content);
                setPostContent(contentHtml);
                setLoading(false);
            })
            .catch((error) => {
                if (error instanceof HttpException) {
                    if (error.statusCode === 404) {
                        router.push('/404');
                    }
                }
            });

        registerPostView(+id);

        if (containerRef.current) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = postContent;

            tempDiv.querySelectorAll('blockquote').forEach((el) => {
                el.classList.add(
                    'border-l-4',
                    'border-primary',
                    'pl-4',
                    'italic',
                    'text-neutral-dark',
                );
            });

            tempDiv.querySelectorAll('ul').forEach((el) => {
                el.classList.add('list-disc', 'pl-6');
            });

            tempDiv.querySelectorAll('ol').forEach((el) => {
                el.classList.add('list-decimal', 'pl-6');
            });

            tempDiv.querySelectorAll('h1').forEach((el) => {
                el.classList.add('text-5xl', 'font-bold', 'mt-4', 'mb-2');
            });

            tempDiv.querySelectorAll('h2').forEach((el) => {
                el.classList.add('text-3xl', 'font-bold', 'mt-4', 'mb-2');
            });

            tempDiv.querySelectorAll('h3').forEach((el) => {
                el.classList.add('text-2xl', 'font-semibold', 'mt-3', 'mb-2');
            });

            tempDiv.querySelectorAll('h4').forEach((el) => {
                el.classList.add('text-xl', 'font-semibold', 'mt-3', 'mb-2');
            });

            tempDiv.querySelectorAll('h5').forEach((el) => {
                el.classList.add('text-lg', 'font-medium', 'mt-2', 'mb-1');
            });

            tempDiv.querySelectorAll('h6').forEach((el) => {
                el.classList.add('text-base', 'font-medium', 'mt-2', 'mb-1');
            });

            tempDiv.querySelectorAll('a').forEach((el) => {
                el.classList.add('text-primary', 'hover:underline');
            });

            tempDiv.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block as HTMLElement);
            });

            tempDiv.querySelectorAll("code:not([class^='language'])").forEach((el) => {
                el.classList.add('py-0.5', 'px-1', 'bg-secondary', 'rounded');
            });

            tempDiv.querySelectorAll('b').forEach((el) => {
                el.classList.add('font-bold');
            });

            tempDiv.querySelectorAll('li > p').forEach((p) => {
                const parentLi = p.parentElement;
                if (parentLi) {
                    parentLi.innerHTML = p.innerHTML;
                }
            });

            containerRef.current.innerHTML = tempDiv.innerHTML;
        }
    }, [id, setMetadata, router, postContent]);

    if (loading) {
        return (
            <RootLayout>
                <div className="flex justify-center items-center w-full min-h-[400px] mt-8">
                    <i className="fa fa-spinner fa-spin fa-3x"></i>
                </div>
            </RootLayout>
        );
    }

    return (
        <RootLayout>
            <div
                className={makeStyles([
                    'w-full p-4 bg-secondary-dark rounded',
                    'px-8 md:px-48 lg:px-96',
                ])}
                style={{ whiteSpace: 'pre-line' }}
            >
                <div ref={containerRef} />
            </div>
        </RootLayout>
    );
};

export default Post;
