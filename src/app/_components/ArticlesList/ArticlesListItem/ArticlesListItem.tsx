import React from 'react';
import { IArticlesListItemProps } from './ArticlesListItem.types';
import { ArticlesListItemSkills } from './ArticlesListItemSkills/ArticlesListItemSkills';
import Styles from './ArticleListItem.module.css';

export const ArticlesListItem = ({ 
    title, 
    icon, 
    subtitle, 
    skills,
    href, 
    index 
}: IArticlesListItemProps) => {

    return (
        <div className={Styles.Article}>
            <a 
                href={href} 
                className={`animate-fade-up h-full w-full block`}
                style={{
                    animationDelay: `${100 + index * 100}ms`
                }}
            >
                <button className='w-full h-full relative'>
                    <div className='w-full h-full p-4 flex flex-col justify-center items-center gap-2'>
                        { icon }
                        <span>{ title }</span>
                    </div>
                </button>
            </a>
            <ArticlesListItemSkills skills={skills} />
        </div>
        
     
    )

}