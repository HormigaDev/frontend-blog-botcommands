'use client';
import { useEffect, useState } from 'react';
import Input from './Input';
import Button from './Button';
import FilePicker from './FilePicker';
import { notify } from '@/utils/notify';
import usePostContentStore from '@/stores/post-content.store';
import { createPostContent } from '@/api/posts/createPostContent';
import { updatePostContent } from '@/api/posts/updatePostContent';

const PostContentModal = () => {
    const { postContent, setPostContent } = usePostContentStore();
    const [identifier, setIdentifier] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isClosing, setIsClosing] = useState(false);
    const [id, setId] = useState<number | null>(null);
    const [postId, setPostId] = useState<number | null>(null);

    useEffect(() => {
        if (!postContent.show && !isClosing) return;

        if (!postContent.show && isClosing) {
            setTimeout(() => {
                setPostContent({ ...postContent, show: false });
                setIsClosing(false);
            }, 300);
        }

        setIdentifier(postContent.identifier);
        if (postContent.id) {
            setId(postContent.id);
        }
        if (postContent.postId) {
            setPostId(postContent.postId);
        }
    }, [postContent]);

    function handleSubmit(e: Event) {
        e.preventDefault();
        if (!file) {
            notify({ message: 'No se ha proporcionado el archivo' });
            return;
        }
        if (!identifier || identifier.length < 2 || identifier.length > 100) {
            notify({
                message:
                    'El identificador de la etiqueta debe tener entre 2 y 100 caracteres de longitud',
            });
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            const content = reader.result as string;
            if (!id) {
                if (!postId) {
                    notify({ message: 'Ocurrió un error, el ID del post no fue proporcionado' });
                    return;
                }
                if (!content) {
                    notify({ message: 'No se puede crear un post con contenido vacío.' });
                    return;
                }
                createPostContent({ identifier, content }, postId).then((status) => {
                    if (status === 201) {
                        notify({ message: '¡Post creado correctamente!', type: 'success' });
                    }
                });
            } else {
                if (!content) {
                    notify({ message: 'No se puede actualizar un post con contenido vacío.' });
                    return;
                }
                updatePostContent({ id, identifier, content }).then((status) => {
                    if (status === 204) {
                        notify({ message: '¡Post actualizado correctamente!', type: 'success' });
                    }
                });
            }
            setIsClosing(true);
            setTimeout(() => {
                setPostContent({ ...postContent, show: false });
            }, 300);
        };

        reader.readAsText(file);
    }

    const handleCancel = (e: Event) => {
        e.preventDefault();
        setIsClosing(true);
        setTimeout(() => {
            setPostContent({ ...postContent, show: false });
        }, 300);
    };

    if (!postContent.show && !isClosing) {
        return null;
    }

    return (
        <div
            className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50 transition-opacity duration-300 ${
                isClosing ? 'opacity-0' : 'opacity-100'
            }`}
        >
            <div
                className={`bg-secondary-dark px-8 py-6 rounded-lg sm:w-[90%] md:w-[50%] lg:w-[30%] transition-all duration-300
                    ${isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            >
                <h2 className="text-foreground text-xl font-semibold mb-4">
                    {postContent.editing ? 'Editar Post' : 'Nuevo Post'}
                </h2>
                <form className="space-y-4">
                    <Input
                        type="text"
                        id="identifier"
                        placeholder="Ingrese el identificador de la etiqueta"
                        label="Identificador"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                    />
                    <FilePicker
                        className="mb-12 mt-6"
                        onChange={(file: File) => setFile(file)}
                        accept=".md"
                    />
                    <div className="flex justify-between gap-4 mt-6">
                        <Button onClick={handleCancel} label="Cancelar" color="secondary" />
                        <Button
                            onClick={handleSubmit}
                            label={postContent.editing ? 'Editar' : 'Enviar'}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostContentModal;
