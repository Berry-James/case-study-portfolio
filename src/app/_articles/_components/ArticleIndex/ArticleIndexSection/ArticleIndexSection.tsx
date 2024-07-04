import React from 'react';
import { IArticleIndexSectionProps } from './ArticleIndexSection.types';

/**
 * Section within article
 * 
 * @param props.section             Section to be rendered as a button
 * @param props.index               Index of section to be rendered 
 * 
 * @returns Component
 */
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