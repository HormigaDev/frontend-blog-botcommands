'use client';
import React from 'react';

interface TextRendererProps {
    text: string;
    className?: string;
    type?: 'hidden' | 'apply'; // Tipo de renderización
    limit?: number; // Límite de caracteres
}

const TextRenderer: React.FC<TextRendererProps> = ({
    text,
    className,
    type = 'apply',
    limit = 0,
}) => {
    // Aplica el formato según el tipo (apply o hidden)
    const formattedText =
        type === 'apply'
            ? text.split('\n').join('\n') // Conserva saltos de línea
            : text.split('\n').join('. '); // Reemplaza saltos de línea con ". "

    // Corta el texto si excede el límite
    const displayedText =
        limit > 0 && formattedText.length > limit
            ? `${formattedText.slice(0, limit)}...`
            : formattedText;

    return (
        <div className={className}>
            {type === 'apply'
                ? displayedText.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                          {line}
                          <br />
                      </React.Fragment>
                  ))
                : displayedText}
        </div>
    );
};

export default TextRenderer;
