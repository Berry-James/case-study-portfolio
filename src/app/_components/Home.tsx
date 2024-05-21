'use client';
import React from 'react';
import { ArticlesList } from './ArticlesList/ArticlesList';
import { ARTICLES } from '../_static/static';
import { Contact } from './Contact/Contact';
import { Jersey_25 } from 'next/font/google'
import { VscSparkle } from 'react-icons/vsc';
import { Coin } from './Coin/Coin';
import { Badge } from './Badge/Badge';
import Styles from './Home.module.css';
import { TaskbarContextProvider } from './Taskbar/context/TaskbarContext';
import { Windows } from './Windows/Windows';

const jersey15 = Jersey_25({ subsets: ['latin'], weight: '400' });

export const Home = () => {

    return (
        <TaskbarContextProvider>
            <main className={`flex min-h-screen flex-col justify-center items-center p-12 sm:p-24 gap-4 animate-fade-down animate-delay-400 ${jersey15.className}`}>

                <Windows />

            </main>
        </TaskbarContextProvider>
    
    )

}