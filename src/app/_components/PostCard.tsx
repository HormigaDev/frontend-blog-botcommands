import { CSSProperties } from 'react';

interface Props {
    id: number;
    title: string;
    content: string;
}

const PostCard = ({ id, title, content }: Props) => {
    const paragraphStyles: CSSProperties = {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 5,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '1.5em',
        minHeight: '7.5em',
        flexDirection: 'column',
    };

    return (
        <div className="bg-secondary-dark p-6 rounded-lg min-h-[244px] max-h-[244px]">
            <h3 className="text-xl text-white mb-2">{title}</h3>
            <p style={paragraphStyles} className="text-neutral">
                {content || 'Sin descripción'}
            </p>
            <a
                href={`/posts/${id}`}
                className="text-primary mt-4 inline-block hover:text-primary-dark"
            >
                Leer más
            </a>
        </div>
    );
};

export default PostCard;
