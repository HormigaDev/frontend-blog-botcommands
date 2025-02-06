'use client';
import { getPost } from '@/api/posts/getPost';
import { registerPostView } from '@/api/posts/registerPostView';
import useMetadata from '@/stores/metadata.store';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import RootLayout from '@/app/layouts/RootLayout';
import { HttpException } from '@/types/HttpException';
import Markdown from '@/app/_components/Markdown';

const Post = () => {
    const [postContent, setPostContent] = useState('');
    const { setMetadata } = useMetadata();

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
                setPostContent(post.content);
            })
            .catch((error) => {
                if (error instanceof HttpException) {
                    if (error.statusCode === 404) {
                        router.push('/404');
                    }
                }
            });

        registerPostView(+id);
    }, [id, setMetadata, router, postContent]);

    return (
        <RootLayout>
            <Markdown content={postContent} />
        </RootLayout>
    );
};

export default Post;
