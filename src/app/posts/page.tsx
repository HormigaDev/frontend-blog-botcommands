'use client';
import React, { useEffect, useState } from 'react';
import Input from '@/app/_components/Input';
import Select from '@/app/_components/Select';
import DatePicker from '@/app/_components/DatePicker';
import Button from '@/app/_components/Button';
import { Post } from '@/types/Post';
import { getPosts } from '@/api/posts/getPosts';
import PostCard from '../_components/PostCard';
import RootLayout from '../layouts/RootLayout';
import usePostStore from '@/stores/post.store';
import { SearchPostsPreferences } from '@/types/SearchPostsPreferences';
import { preferences as p } from '@/utils/preferences';
import { useAuthStore } from '@/stores/auth.store';

const Posts = () => {
    const [count, setCount] = useState(0);
    const [posts, setPosts] = useState<Post[]>([]);
    const [orderBy, setOrderBy] = useState('createdAt');
    const [order, setOrder] = useState<'ASC' | 'DESC'>('DESC');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [query, setQuery] = useState('');
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const { isAuthenticated: isAdmin } = useAuthStore();
    const { setPost } = usePostStore();

    const orderOptions = [
        { label: 'Ascedente', value: 'ASC' },
        { label: 'Descendente', value: 'DESC' },
    ];
    const orderByOptions = [
        { label: 'Fecha de creación', value: 'createdAt' },
        { label: 'Popularidad', value: 'views' },
        { label: 'Título', value: 'title' },
    ];
    const paginationOptions = [10, 20, 30, 50, 100];

    function searchPosts() {
        const startdate = startDate || '1900-01-01';
        const enddate = endDate || '2100-01-01';

        getPosts(
            { limit, page },
            { by: orderBy, order },
            {
                startDate: new Date(startdate),
                endDate: new Date(enddate),
                query,
            },
        ).then((data) => {
            setPosts(data.posts);
            setCount(data.count);
        });
    }

    useEffect(() => {
        const preferences: SearchPostsPreferences = p.get('searchPostsPreferences') || {
            orderBy: 'createdAt',
            order: 'DESC',
            startDate: '',
            endDate: '',
            query: '',
            limit: 10,
            page: 1,
        };
        setOrderBy(preferences.orderBy);
        setOrder(preferences.order);
        setQuery(preferences.query);
        setLimit(preferences.limit);
        setPage(preferences.page);

        searchPosts();
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

        const startdate = startDate || '1900-01-01';
        const enddate = endDate || '2100-01-01';

        getPosts(
            { limit, page },
            { by: orderBy, order },
            {
                startDate: new Date(startdate),
                endDate: new Date(enddate),
                query,
            },
        ).then((data) => {
            setPosts(data.posts);
            setCount(data.count);
        });
    };

    const totalPages = Math.ceil(count / limit);

    function handleNewPost(e: Event) {
        e.preventDefault();
        setPost({
            id: 0,
            title: '',
            shortDescription: '',
            keywords: [],
            editing: false,
            show: true,
        });
    }

    return (
        <RootLayout>
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

                {isAdmin && (
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
                            onDelete={searchPosts}
                            onArchive={searchPosts}
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
                                onChange={(e) =>
                                    handleFilterChange('limit', Number(e.target.value))
                                }
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
        </RootLayout>
    );
};

export default Posts;
