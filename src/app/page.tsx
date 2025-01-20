'use client';
import React, { useEffect, useState } from 'react';
import { getPosts } from '@/api/posts/getPosts';
import { Post } from '@/types/Post';
import { makeStyles } from '@/utils/makeStyles';

const Home = () => {
    const defaultPosts: Post[] = [];
    const [posts, setPosts] = useState(defaultPosts);

    useEffect(() => {
        getPosts({ limit: 10, page: 1 }, { by: 'title', order: 'ASC' }).then((data) => {
            setPosts(data.posts.slice(0, 6)); // Cargar al menos 6 posts para tres secciones
        });
    }, []);

    // Sección de los tres posts más destacados
    const featuredPosts = posts.slice(0, 3); // Primeros 3 posts
    const latestPosts = posts.slice(3, 6); // Últimos 3 posts

    return (
        <div className="space-y-8">
            {/* Sección de Introducción al Blog */}
            <section className="bg-primary text-white p-8 rounded-lg">
                <h1 className="text-3xl font-semibold mb-4">Bienvenido a HormigaDev</h1>
                <p className="text-neutral mb-6">
                    HormigaDev es un blog dedicado a proporcionar ejemplos y recursos sobre el uso
                    de comandos para bots de Discord. Aquí podrás encontrar desde guías prácticas
                    hasta ejemplos listos para usar, ideales tanto para novatos como para
                    desarrolladores experimentados. Nuestro objetivo es ayudarte a crear y gestionar
                    bots más efectivos, eficientes y divertidos. Explora nuestras publicaciones más
                    recientes y descubre todo lo que tenemos para ofrecer.
                </p>
                <a
                    href="/about"
                    className={makeStyles([
                        'text-secondary',
                        'hover:text-secondary-dark',
                        'font-semibold',
                        'transition-colors duration-200',
                    ])}
                >
                    Aprende más sobre el blog
                </a>
            </section>

            {/* Sección de Posts Destacados */}
            <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Destacados</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredPosts.map((post, key) => (
                        <div key={key} className="bg-secondary-dark p-6 rounded-lg">
                            <h3 className="text-xl text-white mb-2">{post.title}</h3>
                            <p className="text-neutral">{post.content || 'Sin descripción'}</p>
                            <a
                                href={`/posts/${post.id}`}
                                className="text-primary mt-4 inline-block hover:text-primary-dark"
                            >
                                Leer más
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sección de Últimos Posts */}
            <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Últimos Posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latestPosts.map((post, key) => (
                        <div key={key} className="bg-secondary-dark p-6 rounded-lg">
                            <h3 className="text-xl text-white mb-2">{post.title}</h3>
                            <p className="text-neutral">{post.content || 'Sin descripción'}</p>
                            <a
                                href={`/posts/${post.id}`}
                                className="text-primary mt-4 inline-block hover:text-primary-dark"
                            >
                                Leer más
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sección de Categorías o Enlaces útiles */}
            <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Enlaces útiles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-secondary-dark p-6 rounded-lg">
                        <h3 className="text-xl text-white mb-2">Categoría 1</h3>
                        <p className="text-neutral">Descripción breve de la categoría.</p>
                        <a
                            href="/category/1"
                            className="text-primary mt-4 inline-block hover:text-primary-dark"
                        >
                            Ver más
                        </a>
                    </div>
                    <div className="bg-secondary-dark p-6 rounded-lg">
                        <h3 className="text-xl text-white mb-2">Categoría 2</h3>
                        <p className="text-neutral">Descripción breve de la categoría.</p>
                        <a
                            href="/category/2"
                            className="text-primary mt-4 inline-block hover:text-primary-dark"
                        >
                            Ver más
                        </a>
                    </div>
                    <div className="bg-secondary-dark p-6 rounded-lg">
                        <h3 className="text-xl text-white mb-2">Categoría 3</h3>
                        <p className="text-neutral">Descripción breve de la categoría.</p>
                        <a
                            href="/category/3"
                            className="text-primary mt-4 inline-block hover:text-primary-dark"
                        >
                            Ver más
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
