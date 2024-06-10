import React from 'react';
import { IArticleHeaderProps } from './ArticleHeader.types';
import { IoArrowBack } from 'react-icons/io5';
import { PAGE_ROUTES } from '@/network/pageRoutes';

export const ArticleHeader = ({ title, subtitle }: IArticleHeaderProps) => {

  return (
    <div>

      {/* BACK BUTTON */}
      {/* <a href={PAGE_ROUTES.root} className='flex gap-2 items-center'>
        <IoArrowBack />
        <span className='text-size-1'>Back</span>
      </a> */}

      <h1 className='animate-fade-right'>{ title }</h1>
      <h6 className='animate-fade-left animate-delay-100'>{ subtitle }</h6>
    </div>
  )

}
