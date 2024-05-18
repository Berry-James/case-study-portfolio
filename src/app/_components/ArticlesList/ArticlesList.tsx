import React from 'react';
import { IArticlesListProps } from './ArticlesList.types';
import { ArticlesListItem } from './ArticlesListItem/ArticlesListItem';

export const ArticlesList = ({ articles }: IArticlesListProps) => {

    return (
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
    )

}