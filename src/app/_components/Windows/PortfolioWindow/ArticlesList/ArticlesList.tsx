import React from 'react';
import { IArticlesListProps } from './ArticlesList.types';
import { ArticlesListItem } from './ArticlesListItem/ArticlesListItem';
import { Chakra_Petch } from 'next/font/google';
import { DOCUMENTS_DICT } from '@/app/_components/SystemContext/_static/documents/documents.static';

const charkaPetch = Chakra_Petch({ subsets: ['latin'], weight: '400' });

export const ArticlesList = () => (
    <div className={`${charkaPetch.className} flex flex-col items-center px-4 pb-8 w-full sm:w-auto`}>
        <p className='animate-fade animate-delay-200'>Case Study Archive</p>
        <div className='grid sm:grid-cols-3 grid-cols-1 gap-4 mt-4 w-full'>
            {
                Object.values(DOCUMENTS_DICT).map((documentItem, documentIndex) => 
                    <ArticlesListItem 
                        key={`${documentItem.title}-${documentIndex}`} 
                        index={documentIndex}
                        {...documentItem}
                    />
                )
            }
        </div>

    </div> 
)
