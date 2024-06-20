import React, { useContext } from 'react';
import { IArticlesListItemProps } from './ArticlesListItem.types';
import Styles from './ArticleListItem.module.css';
import { SystemContext } from '@/app/_components/SystemContext/SystemContext';
import { IWindowTemplate, windowIdEnum } from '@/app/_components/SystemContext/_static/windows/windows.types';

export const ArticlesListItem = ({ 
    id,
    title, 
    icon,
    index 
}: IArticlesListItemProps) => {

    // CONTEXT
    const { handleOpenWindow } = useContext(SystemContext);

    // HANDLERS
    const handleClickArticle = () => {

        const customWindow: Partial<IWindowTemplate> = {
            componentProps: {
                documentId: id
            }
        }

        handleOpenWindow(windowIdEnum.document, customWindow);
    }

    return (
        <div className={Styles.Article}>
            {/* <a 
                href={href} 
                className={`animate-fade-up h-full w-full block`}
                style={{
                    animationDelay: `${100 + index * 100}ms`
                }}
            > */}
                <button className='text-button w-full h-full relative' onClick={handleClickArticle}>
                    <div className='w-full h-full p-4 flex flex-col justify-center items-center gap-2'>
                        { icon }
                        <span>{ title }</span>
                    </div>
                </button>
            {/* </a> */}
            {/* <ArticlesListItemSkills skills={skills} /> */}
        </div>
        
     
    )

}