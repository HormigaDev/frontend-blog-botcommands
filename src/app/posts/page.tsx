'use client';
import React, { useEffect, useState } from 'react';
import Input from '@/app/_components/Input';
import Select from '@/app/_components/Select';
import DatePicker from '@/app/_components/DatePicker';
import Button from '@/app/_components/Button'; // Importa el componente Button
import { Post } from '@/types/Post';
import { getPosts } from '@/api/posts/getPosts';
import PostCard from '../_components/PostCard';

const Posts = () => {
    const defaultPosts: Post[] = [];
    const [count, setCount] = useState(0);
    const [posts, setPosts] = useState(defaultPosts);
    const [orderBy, setOrderBy] = useState('createdAt');
    const [order, setOrder] = useState('ASC');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [query, setQuery] = useState('');
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

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

    useEffect(() => {
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
    }, [startDate, endDate, limit, page, orderBy, order, query]);

    const handleFilterChange = (
        filter: 'orderBy' | 'order' | 'startDate' | 'endDate' | 'query' | 'limit' | 'page',
        value: string | number,
    ) => {
        switch (filter) {
            case 'orderBy':
                setOrderBy(value as string);
                break;
            case 'order':
                setOrder(value as string);
                break;
            case 'startDate':
                setStartDate(value as string);
                break;
            case 'endDate':
                setEndDate(value as string);
                break;
            case 'query':
                setQuery(value as string);
                break;
            case 'limit':
                setLimit(value as number);
                break;
            case 'page':
                setPage(value as number);
                break;
        }

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

    const totalPages = Math.ceil(count / limit); // Calculamos el número total de páginas

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, key) => (
                    <PostCard
                        id={post.id}
                        key={key}
                        title={post.title}
                        content={post.shortDescription}
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

export default Posts;
