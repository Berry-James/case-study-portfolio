import React from 'react';
import { ArticlesList } from './ArticlesList/ArticlesList';
import { ARTICLES } from '../_static/static';
import { Contact } from './Contact/Contact';
import { Jersey_25 } from 'next/font/google'
import { VscSparkle } from 'react-icons/vsc';
import { Coin } from './Coin/Coin';
import { Badge } from './Badge/Badge';
import Styles from './Home.module.css';

const jersey15 = Jersey_25({ subsets: ['latin'], weight: '400' });

export const Home = () => {

    return (
        <main className={`flex min-h-screen flex-col justify-center items-center p-24 gap-4 ${jersey15.className}`}>

            {/* TITLE */}
            <div className={jersey15.className}>
                <Badge
                    badgeContent={'Hover for more!'}
                >
                    <h1 className='text-center animate-fade-down'>James Berry</h1>
                </Badge>

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
        </main>
    )

}