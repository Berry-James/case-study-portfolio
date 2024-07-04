'use client';
import React from 'react';
import { IArticleCodeBlockProps } from './ArticleCodeBlock.types';
import { CodeBlock, paraisoLight } from 'react-code-blocks';

/**
 * Simple code block wrapper utilising `react-code-blocks` to render ts inline
 * @implements {IArticleCodeBlockProps}
 * 
 * @param props.code            String of code to be rendered
 * @returns Component
 */
export const ArticleCodeBlock = ({ code }: IArticleCodeBlockProps) => {

    return (
        <CodeBlock 
            text={code}
            language='ts'
            theme={paraisoLight}
        />
    )

}
