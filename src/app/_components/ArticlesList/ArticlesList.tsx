import React from 'react';
import { IArticlesListProps } from './ArticlesList.types';
import { ArticlesListItem } from './ArticlesListItem/ArticlesListItem';
import { Chakra_Petch } from 'next/font/google';

const charkaPetch = Chakra_Petch({ subsets: ['latin'], weight: '400' });

export const ArticlesList = ({ articles }: IArticlesListProps) => {


    return (
        <div className={`${charkaPetch.className} flex flex-col items-center p-4 pb-8`}>
            <p className='animate-fade animate-delay-200'>Case Study Archive</p>
            <div className='grid grid-cols-3 gap-4 mt-4'>
                {
                    articles.map((article, articleIndex) => 
                        <ArticlesListItem 
                            key={`${article.title}-${articleIndex}`} 
                            index={articleIndex}
                            {...article}
                        />
                    )
                }
            </div>

        </div>
        
    )

}