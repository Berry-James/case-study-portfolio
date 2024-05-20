import React from 'react';
import { IArticleIndexProps } from './ArticleIndex.types';
import { ArticleIndexSection } from './ArticleIndexSection/ArticleIndexSection';
import { CodeBlock } from 'react-code-blocks';

const CODE = "import React from 'react'"

export const ArticleIndex = ({ sections }: IArticleIndexProps) => {

    return (
        <div className='mb-6 mt-2'>
            {/* <p className='mb-2'>Jump to key learnings</p> */}
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-4 w-full sm:w-fit-content'>
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
