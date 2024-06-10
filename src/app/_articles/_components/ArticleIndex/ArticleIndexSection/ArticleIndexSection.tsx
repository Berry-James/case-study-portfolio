import React from 'react';
import { IArticleIndexSectionProps } from './ArticleIndexSection.types';

export const ArticleIndexSection = ({ section, index }: IArticleIndexSectionProps) => {

    return (
        <button className='text-button'>
            <a 
                href={`#${section.hrefId}`} 
                className={`animate-fade`}
                style={{
                    animationDelay: `${100 * index}ms`
                }}
            >
                <div className='p-2 rounded-md flex flex-col items-center'>
                    { section.icon }
                    <code>{ section.title }</code>
                </div>
            </a>
        </button>
       
    )

    }