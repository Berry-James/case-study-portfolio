import React from 'react';
import { IArticleListItemSkillsProps } from './ArticlesListItemSkills.types';
import Styles from '../ArticleListItem.module.css';

export const ArticlesListItemSkills = ({ skills }: IArticleListItemSkillsProps) => {

    return (
        <div className={Styles.SkillContainer}>
            {
                skills.map((skill, skillIndex) => (
                    <div 
                        className={`${Styles.SkillItem} py-2 px-4 border bg-white absolute`}
                        key={`${skill.title}-${skillIndex}`}
                    >
                        {skill.icon}
                        <span className='text-sm'>
                            {skill.title}
                        </span>
                    </div>
                ))
            }
        </div>
    )

}