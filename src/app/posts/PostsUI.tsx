// components/client/PostsUI.tsx
'use client';

import { useState, useEffect } from 'react';
import Input from '@/app/_components/Input';
import Select from '@/app/_components/Select';
import DatePicker from '@/app/_components/DatePicker';
import Button from '@/app/_components/Button';
import PostCard from '../_components/PostCard';
import { SearchPostsPreferences } from '@/types/SearchPostsPreferences';
import usePostStore from '@/stores/post.store';
import { useAuthStore } from '@/stores/auth.store';
import { Post } from '@/types/Post';
import { preferences as p } from '@/utils/preferences';

interface PostsUIProps {
    posts: Post[];
    count: number;
    preferences: SearchPostsPreferences;
    startDate: string;
    endDate: string;
}

const PostsUI = ({ posts, count, preferences, startDate: sd, endDate: ed }: PostsUIProps) => {
    const [orderBy, setOrderBy] = useState(preferences.orderBy);
    const [order, setOrder] = useState<'ASC' | 'DESC'>(preferences.order);
    const [query, setQuery] = useState(preferences.query);
    const [limit, setLimit] = useState(preferences.limit);
    const [page, setPage] = useState(preferences.page);
    const [startDate, setStartDate] = useState(sd || '');
    const [endDate, setEndDate] = useState(ed || '');
    const { isAuthenticated } = useAuthStore();
    const { setPost } = usePostStore();

    const orderOptions = [
        { label: 'Ascendente', value: 'ASC' },
        { label: 'Descendente', value: 'DESC' },
    ];
    const orderByOptions = [
        { label: 'Fecha de creación', value: 'createdAt' },
        { label: 'Popularidad', value: 'views' },
        { label: 'Título', value: 'title' },
    ];
    const paginationOptions = [10, 20, 30, 50, 100];

    const fetchData = async () => {
        const preferences: SearchPostsPreferences = {
            orderBy,
            order,
            query,
            limit,
            page,
        };

        // Asumimos que `fetchData` se actualizaría a un hook para cliente.
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate, limit, page, orderBy, order, query]);

    const handleFilterChange = (
        filter: 'orderBy' | 'order' | 'startDate' | 'endDate' | 'query' | 'limit' | 'page',
        value: string | number,
    ) => {
        const searchPreferences: SearchPostsPreferences = {
            orderBy,
            order,
            query,
            limit,
            page,
        };
        switch (filter) {
            case 'orderBy':
                searchPreferences[filter] = value as string;
                setOrderBy(value as string);
                break;
            case 'order':
                searchPreferences[filter] = value as 'ASC' | 'DESC';
                setOrder(value as 'DESC' | 'ASC');
                break;
            case 'startDate':
                setStartDate(value as string);
                break;
            case 'endDate':
                setEndDate(value as string);
                break;
            case 'query':
                searchPreferences[filter] = value as string;
                setQuery(value as string);
                break;
            case 'limit':
                searchPreferences[filter] = value as number;
                setLimit(value as number);
                break;
            case 'page':
                searchPreferences[filter] = value as number;
                setPage(value as number);
                break;
        }

        p.set('searchPostsPreferences', searchPreferences);

        fetchData();
    };

    const totalPages = Math.ceil(count / limit);

    const handleNewPost = (e: Event) => {
        e.preventDefault();
        setPost({
            id: 0,
            title: '',
            shortDescription: '',
            keywords: [],
            editing: false,
            show: true,
        });
    };

    return (
        <div className="space-y-8">
            <div className="bg-secondary-dark p-6 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div>
                        <Select
                            id="orderBy"
                            label="Ordenar por"
                            value={orderBy}
                            onChange={(e) => handleFilterChange('orderBy', e.target.value)}
                            options={orderByOptions}
                            hiddenLabel
                        />
                    </div>

                    <div>
                        <Select
                            id="order"
                            label="Orden"
                            value={order}
                            onChange={(e) => handleFilterChange('order', e.target.value)}
                            options={orderOptions}
                            hiddenLabel
                        />
                    </div>

                    <DatePicker
                        id="startDate"
                        label="Fecha Inicio"
                        value={startDate}
                        onChange={(e) => handleFilterChange('startDate', e.target.value)}
                        hiddenLabel
                    />
                    <DatePicker
                        id="endDate"
                        label="Fecha Fin"
                        value={endDate}
                        onChange={(e) => handleFilterChange('endDate', e.target.value)}
                        hiddenLabel
                    />

                    <div>
                        <Input
                            type="text"
                            id="query"
                            placeholder="Buscar"
                            value={query}
                            onChange={(e) => handleFilterChange('query', e.target.value)}
                            hiddenLabel
                        />
                    </div>
                </div>
            </div>

            {isAuthenticated && (
                <div className="flex items-center justify-center">
                    <Button
                        onClick={handleNewPost}
                        label="Nuevo Post"
                        className="w-[300px] text-xl"
                        icon="fa fa-plus"
                    />
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, key) => (
                    <PostCard
                        id={post.id}
                        key={key}
                        title={post.title}
                        content={post.shortDescription}
                        keywords={post.keywords}
                        onDelete={fetchData}
                        onArchive={fetchData}
                        date={post.createdAt}
                    />
                ))}
            </div>
            {!count && (
                <div>
                    <h3 className="text-4xl text-center w-full opacity-[0.2] font-bold mb-16">
                        No hay nada para mostrar aquí :(
                    </h3>
                </div>
            )}

            <div className="bg-secondary-dark p-6 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <Select
                            id="limit"
                            value={limit.toString()}
                            onChange={(e) => handleFilterChange('limit', Number(e.target.value))}
                            options={paginationOptions}
                            className="w-24"
                        />
                    </div>

                    <div className="flex justify-between items-center space-x-4">
                        <Button
                            label="Anterior"
                            onClick={() => handleFilterChange('page', Math.max(page - 1, 1))}
                            disabled={page <= 1}
                        />
                        <span className="text-neutral">
                            Página {page} de {totalPages}
                        </span>
                        <Button
                            label="Siguiente"
                            onClick={() =>
                                handleFilterChange('page', Math.min(page + 1, totalPages))
                            }
                            disabled={page >= totalPages}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostsUI;
