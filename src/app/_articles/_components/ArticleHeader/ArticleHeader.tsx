import React from 'react';
import { IArticleHeaderProps } from './ArticleHeader.types';
import { IoArrowBack } from 'react-icons/io5';
import { PAGE_ROUTES } from '@/network/pageRoutes';

export const ArticleHeader = ({ title, subtitle }: IArticleHeaderProps) => {

  return (
    <div>
      <h1 className='animate-fade-right'>{ title }</h1>
      <h6 className='animate-fade-left animate-delay-100'>{ subtitle }</h6>
    </div>
  )

}
