'use client';
import { useEffect, useState } from 'react';
import Input from './Input';
import Button from './Button';
import FilePicker from './FilePicker';
import usePostStore from '@/stores/post.store';
import { createPost } from '@/api/posts/createPost';
import { notify } from '@/utils/notify';

const PostModal: React.FC = () => {
    const { post, setPost } = usePostStore();
    const [title, setTitle] = useState(post.title);
    const [shortDescription, setShortDescription] = useState(post.shortDescription);
    const [keywords, setKeywords] = useState<string>(post.keywords.join(',') || '');
    const [file, setFile] = useState<File | null>(null);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (!post.show && !isClosing) return;

        if (!post.show && isClosing) {
            setTimeout(() => {
                setPost({ ...post, show: false });
                setIsClosing(false);
            }, 300);
        }

        setTitle(post.title);
        setShortDescription(post.shortDescription);
        setKeywords(post.keywords.join(','));
    }, [post]);

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        if (!file) {
            notify({ message: 'Por favor seleccione un archivo .md' });
            return;
        }

        const form = new FormData();
        form.append('files', file as File);
        form.append('title', title);
        if (title.length < 3 || title.length > 255) {
            notify({ message: 'El título del Post debe tener entre 2 y 255 caracteres' });
            return;
        }
        form.append('shortDescription', shortDescription);
        if (shortDescription.length < 50 || shortDescription.length > 300) {
            notify({ message: 'El resumen del post debe tener entre 50 y 300 caracteres' });
            return;
        }
        let keyWords = keywords;
        if (!keyWords.split(',').length) {
            keyWords = 'bot,commands,discord';
        }

        for (const keyword of keyWords.split(',')) {
            form.append('keywords[]', keyword.trim());
        }

        if (post.id) {
            form.append('id', String(post.id));
        }

        createPost(form).then((statusCode) => {
            if (statusCode === 201) {
                notify({
                    message: `¡Post ${post.editing ? 'Editado' : 'Creado'} correctamente!`,
                    type: 'success',
                });
                setIsClosing(true);
                setTimeout(() => {
                    setPost({ ...post, show: false });
                }, 300);
            }
        });
    };

    const handleCancel = (e: Event) => {
        e.preventDefault();
        setIsClosing(true);
        setTimeout(() => {
            setPost({ ...post, show: false });
        }, 300);
    };

    if (!post.show && !isClosing) {
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
                    {post.editing ? 'Editar Post' : 'Nuevo Post'}
                </h2>
                <form className="space-y-4">
                    <Input
                        type="text"
                        id="title"
                        placeholder="Ingrese el título"
                        label="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        type="textarea"
                        id="shortDescription"
                        placeholder="Ingrese una descripción corta"
                        label="Resumen"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        className="min-h-[160px]"
                    />
                    <Input
                        type="text"
                        id="keywords"
                        placeholder="Ingrese las palabras clave separadas por coma (,)"
                        label="Palabras clave"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                    />
                    <FilePicker
                        className="mb-12 mt-6"
                        onChange={(file: File) => setFile(file)}
                        accept=".md"
                    />
                    <div className="flex justify-between gap-4 mt-6">
                        <Button onClick={handleCancel} label="Cancelar" color="secondary" />
                        <Button onClick={handleSubmit} label={post.editing ? 'Editar' : 'Enviar'} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostModal;
