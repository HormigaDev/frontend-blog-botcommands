'use client';

import { useState } from 'react';
import Button from './Button';
import { useAuthStore } from '@/stores/auth.store';
import usePostContentStore from '@/stores/post-content.store';

interface Tab {
    id: number;
    label: string;
    component: React.ReactNode;
}

interface TabsProps {
    postId: number;
    tabs: Tab[];
}

const Tabs = ({ tabs, postId }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(0);
    const { isAuthenticated } = useAuthStore();
    const { setPostContent } = usePostContentStore();

    function newPostContent(e: Event) {
        e.preventDefault();
        setPostContent({
            show: true,
            editing: false,
            identifier: '',
            postId,
            id: undefined,
        });
    }

    function handleEditPostContent(id: number, identifier: string) {
        if (!isAuthenticated) return;
        setPostContent({
            show: true,
            editing: true,
            identifier,
            id,
            postId: undefined,
        });
    }

    return (
        <div className="w-full">
            <div
                className="flex border-b-2 pb-2 border-secondary w-full"
                style={{ overflowX: 'auto' }}
            >
                {isAuthenticated && (
                    <Button icon="fa fa-plus" className="mr-4" onClick={newPostContent} />
                )}
                {tabs.map((tab, index) => (
                    <Button
                        label={tab.label}
                        onClick={() => setActiveTab(index)}
                        key={tab.id}
                        color={activeTab === index ? 'primary' : 'secondary'}
                        className="mr-4"
                        onRightClick={(e) => {
                            e.preventDefault();
                            handleEditPostContent(tab.id, tab.label);
                        }}
                    />
                ))}
            </div>

            <div className="pt-4">{tabs[activeTab]?.component}</div>
        </div>
    );
};

export default Tabs;
