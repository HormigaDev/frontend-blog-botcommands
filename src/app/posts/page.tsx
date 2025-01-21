'use client';
import React, { useEffect, useState } from 'react';
import Input from '@/app/_components/Input';
import Select from '@/app/_components/Select';
import DatePicker from '@/app/_components/DatePicker';
import Button from '@/app/_components/Button'; // Importa el componente Button
import { Post } from '@/types/Post';
import { getPosts } from '@/api/posts/getPosts';
import TextRenderer from '../_components/TextRenderer';

const Posts = () => {
    const defaultPosts: Post[] = [];
    const [count, setCount] = useState(0);
    const [posts, setPosts] = useState(defaultPosts);
    const [orderBy, setOrderBy] = useState('title');
    const [order, setOrder] = useState('ASC');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('');
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const statusOptions = [
        { label: 'Activo', value: 1 },
        { label: 'Archivado', value: 4 },
    ];
    const orderOptions = [
        { label: 'Ascedente', value: 'ASC' },
        { label: 'Descendente', value: 'DESC' },
    ];
    const orderByOptions = [
        { label: 'Fecha de creación', value: 'createdAt' },
        { label: 'Título', value: 'title' },
        { label: 'Contenido', value: 'content' },
        { label: 'Estado', value: 'status' },
    ];
    const paginationOptions = [10, 20, 30, 50, 100];

    useEffect(() => {
        let startdate = '1900-01-01';
        let enddate = '2100-01-01';

        if (startDate) {
            startdate = startDate;
        }
        if (endDate) {
            enddate = endDate;
        }
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

    const handleFilterChange = () => {};

    const totalPages = Math.ceil(count / limit); // Calculamos el número total de páginas

    return (
        <div className="space-y-8">
            {/* Filtros */}
            <div className="bg-secondary-dark p-6 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div>
                        <Select
                            id="orderBy"
                            label="Ordenar por"
                            value={orderBy}
                            onChange={(e) => setOrderBy(e.target.value)}
                            options={orderByOptions}
                            hiddenLabel
                        />
                    </div>

                    <div>
                        <Select
                            id="order"
                            label="Orden"
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                            options={orderOptions}
                            hiddenLabel
                        />
                    </div>

                    <div>
                        <Input
                            type="text"
                            id="query"
                            placeholder="Buscar"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            hiddenLabel
                        />
                    </div>

                    <div>
                        <Select
                            id="status"
                            label="Estado"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            options={statusOptions}
                            hiddenLabel
                        />
                    </div>
                    <DatePicker
                        id="startDate"
                        label="Fecha Inicio"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        hiddenLabel
                    />
                    <DatePicker
                        id="endDate"
                        label="Fecha Fin"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        hiddenLabel
                    />
                    <Button label="Aplicar Filtros" onClick={handleFilterChange} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, key) => (
                    <div key={key} className="bg-secondary-dark p-6 rounded-lg">
                        <h3 className="text-xl text-white mb-2">{post.title}</h3>
                        <TextRenderer text={post.content || 'Sin descripción'} type="hidden" />
                        <a
                            href={`/posts/${post.id}`}
                            className="text-primary mt-4 inline-block hover:text-primary-dark"
                        >
                            Leer más
                        </a>
                    </div>
                ))}
            </div>

            <div className="bg-secondary-dark p-6 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <Select
                            id="limit"
                            value={limit.toString()}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            options={paginationOptions}
                            className="w-24"
                        />
                    </div>

                    <div className="flex justify-between items-center space-x-4">
                        <Button
                            label="Anterior"
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page <= 1}
                        />
                        <span className="text-neutral">
                            Página {page} de {totalPages}
                        </span>
                        <Button
                            label="Siguiente"
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={page >= totalPages}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Posts;
