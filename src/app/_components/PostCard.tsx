'use client';
import { archivePost } from '@/api/posts/archivePost';
import { deletePost } from '@/api/posts/deletePost';
import { useAuthStore } from '@/stores/auth.store';
import useDialog from '@/stores/dialog.store';
import usePostStore from '@/stores/post.store';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';
import { CSSProperties } from 'react';
interface Props {
    id: number;
    title: string;
    content: string;
    keywords: string[];
    date: Date;
    onDelete?: () => void;
    onArchive?: () => void;
}

const PostCard = ({
    id,
    title,
    content,
    keywords,
    date,
    onDelete = () => {},
    onArchive = () => {},
}: Props) => {
    const { isAuthenticated } = useAuthStore();
    const { dialog, setDialog } = useDialog();
    const { setPost } = usePostStore();

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

    function handleDeletePost() {
        setDialog({
            ...dialog,
            message: '¿Estás seguro que deseas eliminar este post?',
            actions: {
                ok: {
                    label: 'Eliminar',
                    onClick() {
                        deletePost(id).then(() => {
                            onDelete();
                        });
                    },
                    color: 'error',
                },
                cancel: {
                    label: 'Cancelar',
                    onClick: dialog.actions.cancel.onClick,
                },
            },
            show: true,
        });
    }
    function handleArchivePost() {
        setDialog({
            ...dialog,
            message: '¿Estás seguro que deseas archivar este post?',
            actions: {
                ok: {
                    label: 'Archivar',
                    onClick() {
                        archivePost(id).then(() => {
                            onArchive();
                        });
                    },
                    color: 'warning',
                },
                cancel: {
                    label: 'Cancelar',
                    onClick: dialog.actions.cancel.onClick,
                },
            },
            show: true,
        });
    }

    function handleEdit() {
        setPost({
            show: true,
            title,
            shortDescription: content,
            id,
            keywords,
            editing: true,
        });
    }

    return (
        <div className="bg-secondary-dark p-6 rounded-lg min-h-[244px] max-h-[244px] relative pb-8">
            <h3 className="text-xl text-white mb-2">{title}</h3>
            <p style={paragraphStyles} className="text-neutral">
                {content || 'Sin descripción'}
            </p>
            <Link
                href={`/posts/${id}`}
                className="text-primary inline-block hover:text-primary-dark absolute bottom-0 left-0 m-2"
            >
                Ver publicación
            </Link>
            <small className="text-neutral-dark inline-block absolute bottom-0 right-0 m-2">
                Publicado en: {formatDate(date)}
            </small>
            {isAuthenticated && (
                <div className="absolute top-0 right-0 m-1 h-[12px]">
                    <button aria-label="Editar post" onClick={handleEdit}>
                        <i className="fa fa-edit font-bold mx-2" />
                    </button>
                    <button aria-label="Archivar post" onClick={handleArchivePost}>
                        <i className="fa fa-archive font-bold mx-2"></i>
                    </button>
                    <button aria-label="Eliminar post" onClick={handleDeletePost}>
                        <i className="fa fa-trash font-bold mx-1 text-error"></i>
                    </button>
                </div>
            )}
        </div>
    );
};

export default PostCard;
