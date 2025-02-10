import { Metadata } from 'next';
import { Post } from '@/types/Post';
import _metadata from '@/app/data/metadata.json';
import { makeStyles } from '@/utils/makeStyles';
import PostCard from './_components/PostCard';
import { getFeaturedPosts } from '@/api/posts/getFeaturedPosts';
import { getLatestPosts } from '@/api/posts/getLatestPosts';
import RootLayout from '@/app/layouts/RootLayout';

const host = process.env.HOST; // Obtener el host desde el entorno

// Exportar metadata con los valores de _metadata.inicio
export const metadata: Metadata = {
    title: 'HormigaDev - ' + _metadata.inicio.title,
    description: _metadata.inicio.description,
    keywords: _metadata.inicio.keywords.join(', '),
    openGraph: {
        title: 'HormigaDev - ' + _metadata.inicio.title,
        description: _metadata.inicio.description,
        images: `${host}/logo.png`,
        url: `${host}`,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'HormigaDev - ' + _metadata.inicio.title,
        description: _metadata.inicio.description,
        images: `${host}/logo.png`,
    },
    authors: [{ name: 'Isaí Medina', url: 'portfolio.hormiga.dev' }],
};

// Componente Home como Server Component
const Home = async () => {
    const { posts: featuredPosts } = await getFeaturedPosts();
    const { posts: latestPosts } = await getLatestPosts();

    return (
        <RootLayout>
            <div className="space-y-8">
                {/* Sección de bienvenida */}
                <section className="bg-primary text-white p-8 rounded-lg">
                    <h1 className="text-3xl font-semibold mb-4">Bienvenido a HormigaDev</h1>
                    <p className="text-neutral mb-6">
                        HormigaDev es un blog dedicado a proporcionar ejemplos y recursos sobre el
                        uso de comandos para bots de Discord. Aquí podrás encontrar desde guías
                        prácticas hasta ejemplos listos para usar, ideales tanto para novatos como
                        para desarrolladores experimentados. Nuestro objetivo es ayudarte a crear y
                        gestionar bots más efectivos, eficientes y divertidos. Explora nuestras
                        publicaciones más recientes y descubre todo lo que tenemos para ofrecer.
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

                {/* Sección de posts destacados */}
                <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">Destacados</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredPosts.map((post: Post, key) => (
                            <PostCard
                                id={post.id}
                                key={key}
                                title={post.title}
                                content={post.shortDescription}
                                keywords={post.keywords}
                                date={post.createdAt}
                            />
                        ))}
                    </div>
                </section>

                {/* Sección de últimos posts */}
                <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">Últimos Posts</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestPosts.map((post: Post, key) => (
                            <PostCard
                                id={post.id}
                                key={key}
                                title={post.title}
                                content={post.shortDescription}
                                keywords={post.keywords}
                                date={post.createdAt}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </RootLayout>
    );
};

export default Home;
