import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-typescript.min';

const generateId = (text: string) => {
    return text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .slice(0, 50);
};

const replaceAsterisks = (text: string) => {
    text = text.replace(
        /\*\*\*\s?(.*?)\s?\*\*\*/g,
        (match, content) =>
            `<strong id="${generateId(
                content,
            )}" class="font-bold italic text-foreground">${content}</strong>`,
    );

    text = text.replace(
        /\*\*\s?(.*?)\s?\*\*\*/g,
        (match, content) =>
            `<strong id="${generateId(
                content,
            )}" class="font-bold text-foreground">${content}</strong>`,
    );

    text = text.replace(
        /\*\s?(.*?)\s?\*/g,
        (match, content) =>
            `<i id="${generateId(content)}" class="italic text-foreground">${content}</i>`,
    );

    return text;
};

const replaceCodeBlocks = (text: string) => {
    const blockCodePattern = /```(.*?)\n([\s\S]*?)```/g;
    text = text.replace(blockCodePattern, (match, language, code) => {
        const id = generateId(code);
        return `<div class="relative">
            <pre is-code id="${id}" class="bg-secondary-dark p-4 rounded-lg overflow-auto"><code language="${language}">${Prism.highlight(
            code,
            Prism.languages[language],
            language,
        )}</code></pre>
        </div>`;
    });

    const inlineCodePattern = /`([^`]+)`/g;
    text = text.replace(
        inlineCodePattern,
        (match, content) =>
            `<code id="${generateId(
                content,
            )}" class="bg-secondary text-neutral px-1 py-0.5 rounded">${content}</code>`,
    );

    return text;
};

const replaceHorizontalRules = (text: string): string => {
    return text
        .split('\n')
        .map((line) =>
            line.trim() === '---' ? '<hr class="border-t-[1px] border-neutral my-4" />' : line,
        )
        .join('\n');
};

const formatHeadings = (text: string) => {
    const lines = text.split('\n');

    const formattedLines = lines.map((line) => {
        line = line.trim();

        if (line.startsWith('# ')) {
            return `<h1 id="${generateId(
                line.slice(2),
            )}" class="text-foreground text-4xl font-bold m-8">${line.slice(2)}</h1>`;
        } else if (line.startsWith('## ')) {
            return `<h2 id="${generateId(
                line.slice(3),
            )}" class="text-white text-3xl font-bold mb-3">${line.slice(3)}</h2>`;
        } else if (line.startsWith('### ')) {
            return `<h3 id="${generateId(
                line.slice(4),
            )}" class="text-white text-2xl font-semibold mb-2">${line.slice(4)}</h3>`;
        } else if (line.startsWith('#### ')) {
            return `<h4 id="${generateId(
                line.slice(5),
            )}" class="text-neutral text-xl font-semibold mb-2">${line.slice(5)}</h4>`;
        } else if (line.startsWith('##### ')) {
            return `<h5 id="${generateId(
                line.slice(6),
            )}" class="text-neutral-dark text-lg font-medium mb-1">${line.slice(6)}</h5>`;
        } else if (line.startsWith('###### ')) {
            return `<h6 id="${generateId(
                line.slice(7),
            )}" class="text-neutral-dark text-base font-medium mb-1">${line.slice(7)}</h6>`;
        } else {
            return line;
        }
    });

    return formattedLines.join('\n');
};

const formatLists = (text: string) => {
    const lines = text.split('\n');
    let result = '';
    let inUnorderedList = false;
    let inOrderedList = false;
    let inSubList = false;

    lines.forEach((line) => {
        line = line.trim();

        if (line.startsWith('- ')) {
            if (inSubList) {
                result += '        </ul>\n'; // Cierra la sublista
                inSubList = false;
            }

            if (!inUnorderedList) {
                if (inOrderedList) {
                    result += '</ol>\n'; // Cierra la lista ordenada
                    inOrderedList = false;
                }
                result += '<ul class="list-disc pl-5 text-neutral mb-2">\n'; // Abre la lista desordenada
                inUnorderedList = true;
            }

            const id = generateId(line.slice(2));
            result += `    <li id="${id}">${line.slice(2)}`; // Abre el elemento de la lista
        } else if (line.startsWith('-- ')) {
            if (!inSubList) {
                result += '\n        <ul class="list-disc pl-10 text-neutral mb-2">\n'; // Abre la sublista
                inSubList = true;
            }
            const id = generateId(line.slice(3));
            result += `        <li id="${id}">${line.slice(3)}</li>\n`; // Agrega un elemento a la sublista
        } else if (line.match(/^\d+\.\s/)) {
            if (inSubList) {
                result += '        </ul>\n'; // Cierra la sublista
                inSubList = false;
            }

            if (!inOrderedList) {
                if (inUnorderedList) {
                    result += '</ul>\n'; // Cierra la lista desordenada
                    inUnorderedList = false;
                }
                result += '<ol class="list-decimal pl-5 text-neutral mb-2">\n'; // Abre la lista ordenada
                inOrderedList = true;
            }

            const id = generateId(line.slice(line.indexOf('.') + 2));
            result += `    <li id="${id}">${line.slice(line.indexOf('.') + 2)}`; // Abre el elemento de la lista ordenada
        } else {
            if (inSubList) {
                result += '        </ul>\n'; // Cierra la sublista si existe
                inSubList = false;
            }
            if (inUnorderedList) {
                result += '</li>\n</ul>\n'; // Cierra el elemento y la lista desordenada
                inUnorderedList = false;
            }
            if (inOrderedList) {
                result += '</li>\n</ol>\n'; // Cierra el elemento y la lista ordenada
                inOrderedList = false;
            }

            result += line + '\n'; // Agrega texto fuera de las listas
        }
    });

    if (inSubList) result += '        </ul>\n'; // Cierra la sublista final si está abierta
    if (inOrderedList) result += '</li>\n</ol>\n'; // Cierra la lista ordenada final si está abierta
    if (inUnorderedList) result += '</li>\n</ul>\n'; // Cierra la lista desordenada final si está abierta

    return result;
};

const formatLinks = (text: string) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;

    return text.replace(regex, (match, content, link) => {
        return `<a id="${generateId(
            content,
        )}" href="${link}" class="text-primary underline hover:text-primary-dark">${content}</a>`;
    });
};

const formatBlockquotes = (text: string) => {
    const regex = /^>\s?(.*)/gm;

    return text.replace(regex, (match, content) => {
        return `<blockquote id="${generateId(
            content,
        )}" class="border-l-4 border-primary pl-4 italic text-neutral mb-4">${content}</blockquote>`;
    });
};

export const parseMarkdownToHtml = (markdown: string) => {
    let html = markdown;

    html = formatHeadings(html);
    html = formatLists(html);
    html = formatBlockquotes(html);
    html = formatLinks(html);
    html = replaceAsterisks(html);
    html = replaceCodeBlocks(html);
    html = replaceHorizontalRules(html);

    return html;
};
