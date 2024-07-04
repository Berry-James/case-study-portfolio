import React from 'react';
import { IArticleIndexProps } from './ArticleIndex.types';
import { ArticleIndexSection } from './ArticleIndexSection/ArticleIndexSection';

/**
 * Index of article, contains buttons used to jump to various sections in the article
 * @implements {IArticleIndexProps}
 * 
 * @param props.sections            Article sections to render as buttons
 * @returns Component
 */
export const ArticleIndex = ({ sections }: IArticleIndexProps) => {

    return (
        <div className='mb-6 mt-2'>
            <div className={`grid grid-cols-1 gap-4 sm:grid-cols-${sections.length} w-full sm:w-fit-content`}>
                {
                    sections.map((section, sectionIndex) => 
                        <ArticleIndexSection 
                            key={`${section.hrefId}-${sectionIndex}`} 
                            section={section}
                            index={sectionIndex}
                        />
                    )
                }
            </div>
        </div>
       
    )

}
