import { notFound } from 'next/navigation';
import RootLayout from '@/app/layouts/RootLayout';
import { getPost } from '@/api/posts/getPost';
import { registerPostView } from '@/api/posts/registerPostView';
import ClientPost from './ClientPost';
import { Tab } from '@/types/Tab';
import Markdown from '@/app/_components/Markdown';

// Usamos `generateMetadata` para generar los metadatos dinámicamente
export async function generateMetadata({ params }: { params: Promise<any> }) {
    const postId = Number((await params).id);

    if (isNaN(postId)) {
        return {}; // Si no es un ID válido, no generamos metadata
    }

    try {
        const post = await getPost(postId);
        const host = process.env.HOST || 'http://localhost:3000'; // URL base desde el entorno
        const pathname = `/post/${post.id}`; // Path dinámico para cada post

        return {
            title: 'HormigaDev - ' + post.title,
            description: post.shortDescription,
            keywords: post.keywords.join(', '),
            openGraph: {
                title: 'HormigaDev - ' + post.title,
                description: post.shortDescription,
                image: `${host}/logo.png`,
                url: `${host}${pathname}`,
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: 'HormigaDev - ' + post.title,
                description: post.shortDescription,
                image: `${host}/logo.png`,
            },
            author: 'Isai Medina',
            canonical: `${host}${pathname}`,
        };
    } catch (error) {
        console.log('ERROR DE METADATA:', error);
        return {};
    }
}

export default async function PagePost({ params }: { params: Promise<any> }) {
    const postId = Number((await params).id);

    if (isNaN(postId)) {
        notFound();
    }

    try {
        const post = await getPost(postId);
        await registerPostView(postId);

        const tabs: Tab[] = post.contents.map((content) => ({
            id: content.id,
            label: content.identifier,
            component: <Markdown content={content.content} />,
        }));

        return (
            <RootLayout>
                <ClientPost
                    postId={postId}
                    tabs={tabs}
                    metadata={{
                        title: post.title,
                        description: post.shortDescription,
                        keywords: post.keywords,
                    }}
                />
            </RootLayout>
        );
    } catch (error) {
        console.log(error);
        notFound();
    }
}
