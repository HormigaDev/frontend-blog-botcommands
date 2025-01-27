'use client';
import { getPost } from '@/api/posts/getPost';
import { registerPostView } from '@/api/posts/registerPostView';
import useStore from '@/store';
import { parseMarkdownToHtml } from '@/utils/parseMarkdown';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const Post = () => {
    const [postContent, setPostContent] = useState('');
    const [loading, setLoading] = useState(true);
    const { setMetadata } = useStore();

    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        if (!id || isNaN(+id)) {
            router.push('/404');
            return;
        }

        getPost(+id).then((post) => {
            setMetadata({
                title: post.title,
                description: post.shortDescription,
                keywords: post.keywords,
            });
            const html = parseMarkdownToHtml(post.content);
            console.log(html);
            setPostContent(html);
            setLoading(false);
        });

        registerPostView(+id);
    }, [id, setMetadata, router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full min-h-[400px] mt-8">
                <i className="fa fa-spinner fa-spin fa-3x"></i>
            </div>
        );
    }

    return (
        <div className="w-full p-4 bg-dark">
            <div
                style={{ whiteSpace: 'pre-line' }}
                dangerouslySetInnerHTML={{ __html: postContent }}
            ></div>
        </div>
    );
};

export default Post;
