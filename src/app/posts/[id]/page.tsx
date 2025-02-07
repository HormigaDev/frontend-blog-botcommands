'use client';
import { getPost } from '@/api/posts/getPost';
import { registerPostView } from '@/api/posts/registerPostView';
import useMetadata from '@/stores/metadata.store';
import { notFound, useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import RootLayout from '@/app/layouts/RootLayout';
import { HttpException } from '@/types/HttpException';
import Markdown from '@/app/_components/Markdown';
import Tabs from '@/app/_components/Tabs';
import { useLoadingStore } from '@/stores/loading.store';
import { Tab } from '@/types/Tab';

const PagePost = () => {
    const { setMetadata } = useMetadata();
    const [tabs, setTabs] = useState<Tab[]>([]);
    const { id } = useParams();
    const { setLoading } = useLoadingStore();

    useEffect(() => {
        if (!id || isNaN(+id)) {
            notFound();
        }

        getPost(+id)
            .then(async (post) => {
                setMetadata({
                    title: post.title,
                    description: post.shortDescription,
                    keywords: post.keywords,
                });
                const _tabs: Tab[] = [];
                post.contents.forEach((content) => {
                    _tabs.push({
                        id: content.id,
                        label: content.identifier,
                        component: <Markdown content={content.content} />,
                    });
                });
                setTabs(_tabs);
                setLoading(false);
            })
            .catch((error) => {
                if (error instanceof HttpException) {
                    if (error.statusCode === 404) {
                        notFound();
                    }
                }
            });

        registerPostView(+id);
    }, [id, setMetadata, tabs]);

    return (
        <RootLayout>
            <Tabs tabs={tabs} postId={+id!} />
        </RootLayout>
    );
};

export default PagePost;
