'use client';
import React from 'react';
import { IArticleCodeBlockProps } from './ArticleCodeBlock.types';
import { CodeBlock, paraisoLight, paraisoDark } from 'react-code-blocks';

export const ArticleCodeBlock = ({ code }: IArticleCodeBlockProps) => {

    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    console.log('prefers dark mode', prefersDarkMode);

    return (
        <CodeBlock 
            text={code}
            language='ts'
            theme={prefersDarkMode ? paraisoDark : paraisoLight}
        />
    )

}
