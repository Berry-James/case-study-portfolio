import React from 'react';
import { IArticleHeaderProps } from './ArticleHeader.types';

/**
 * Custom header for an article
 * @implements {IArticleHeaderProps}
 * 
 * @param props.title         Title of article
 * @param props.subtitle      Subtitle of article
 * @returns Component
 */
export const ArticleHeader = ({ title, subtitle }: IArticleHeaderProps) => {

  return (
    <div>

      {/* TITLE */}
      <h1 className='animate-fade-right'>{ title }</h1>

      {/* SUBTITLE */}
      <h6 className='animate-fade-left animate-delay-100'>{ subtitle }</h6>

    </div>
  )

}
