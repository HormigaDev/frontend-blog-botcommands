'use client';

import { useEffect } from 'react';
import Tabs from '@/app/_components/Tabs';
import { useLoadingStore } from '@/stores/loading.store';
import useMetadata from '@/stores/metadata.store';
import { Tab } from '@/types/Tab';

type Props = {
    postId: number;
    tabs: Tab[];
    metadata: {
        title: string;
        description: string;
        keywords: string[];
    };
};

export default function ClientPost({ postId, tabs, metadata }: Props) {
    const { setMetadata } = useMetadata();
    const { setLoading } = useLoadingStore();

    useEffect(() => {
        // setMetadata(metadata);
        setLoading(false);
    }, [metadata, setMetadata, setLoading]);

    return <Tabs tabs={tabs} postId={postId} />;
}
