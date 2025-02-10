import { remark } from 'remark';
import html from 'remark-html';
import { visit } from 'unist-util-visit';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

interface MarkdownProps {
    content?: string;
}

// Plugin para aplicar Highlight.js correctamente
const highlightPlugin = () => {
    return (tree: any) => {
        visit(tree, 'code', (node: any) => {
            if (node.value) {
                const language = node.lang || 'plaintext';
                const highlighted = hljs.highlightAuto(node.value).value;
                node.type = 'html';
                node.value = `<pre class="p-4 rounded overflow-x-auto"><code class="hljs language-${language}">${highlighted}</code></pre>`;
            }
        });
    };
};

export default async function Markdown({ content = '' }: MarkdownProps) {
    // Procesar Markdown con Remark + HTML + Highlight.js
    const processedContent = await remark()
        .use(highlightPlugin) // Usar el plugin correctamente
        .use(html, { sanitize: false }) // Permitir HTML completo en la salida
        .process(content);

    let htmlContent = processedContent.toString();

    // Aplicar estilos de Tailwind directamente
    htmlContent = htmlContent.replace(
        /<blockquote>/g,
        `<blockquote class="border-l-4 border-primary pl-4 italic text-neutral-dark">`,
    );
    htmlContent = htmlContent.replace(/<ul>/g, `<ul class="list-disc pl-6">`);
    htmlContent = htmlContent.replace(/<ol>/g, `<ol class="list-decimal pl-6">`);
    htmlContent = htmlContent.replace(/<h1>/g, `<h1 class="text-3xl font-bold mt-4 mb-2">`);
    htmlContent = htmlContent.replace(/<h2>/g, `<h2 class="text-2xl font-bold mt-4 mb-2">`);
    htmlContent = htmlContent.replace(/<h3>/g, `<h3 class="text-xl font-semibold mt-3 mb-2">`);
    htmlContent = htmlContent.replace(/<h4>/g, `<h4 class="text-lg font-semibold mt-3 mb-2">`);
    htmlContent = htmlContent.replace(/<h5>/g, `<h5 class="text-base font-medium mt-2 mb-1">`);
    htmlContent = htmlContent.replace(/<h6>/g, `<h6 class="text-thin font-medium mt-2 mb-1">`);
    htmlContent = htmlContent.replace(/<a /g, `<a class="text-primary hover:underline" `);
    htmlContent = htmlContent.replace(
        /<code(?! class)/g,
        `<code class="py-0.5 px-1 bg-secondary rounded border-neutral-dark border"`,
    );

    // Restaurar el comportamiento de los <li> y eliminar los <p> dentro de ellos
    htmlContent = htmlContent.replace(/<li>\s*<p>/g, '<li>');
    htmlContent = htmlContent.replace(/<\/p>\s*<\/li>/g, '</li>');

    return (
        <div
            className="w-full p-4 bg-secondary-dark rounded lg:px-24 md:px-24 sm:px-4"
            style={{ whiteSpace: 'pre-line' }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
}
