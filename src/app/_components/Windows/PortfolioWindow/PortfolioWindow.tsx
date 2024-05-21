import React from 'react';
import { Badge } from '../../Badge/Badge';
import { VscSparkle } from 'react-icons/vsc';
import { Coin } from '../../Coin/Coin';
import { ArticlesList } from '../../ArticlesList/ArticlesList';
import { Contact } from '../../Contact/Contact';
import { ARTICLES } from '@/app/_static/static';

export const PortfolioWindow = () => {

    return (
        <div className='w-max-content flex flex-col gap-2 justify-center items-center pb-3'>
                <div>
                    {/* TITLE */}
                    <h1 className='text-center animate-fade-down'>James Berry</h1>

                    <div className='flex justify-between items-center gap-2 animate-fade-down animate-delay-100'>
                        <VscSparkle />
                        <span className='text-center'>
                            Full-Stack Software Developer
                        </span>
                        <VscSparkle />
                    </div>
                </div>

                <Coin />

                {/* ARTICLES */}
                <ArticlesList 
                    articles={ARTICLES}
                />

                {/* CONTACT */}
                <Contact />
            </div>

    )

}