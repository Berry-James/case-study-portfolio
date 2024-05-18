'use client';
import React from 'react';
import { IArticleCodeBlockProps } from './ArticleCodeBlock.types';
import { CodeBlock } from 'react-code-blocks';

export const ArticleCodeBlock = ({ code }: IArticleCodeBlockProps) => {

    return (
        <CodeBlock 
            text={code}
            language='ts'
        />
    )

}
