import React from 'react';
import { Badge } from './Badge/Badge';
import { VscSparkle } from 'react-icons/vsc';
import { Coin } from './Coin/Coin';
import { ArticlesList } from './ArticlesList/ArticlesList';
import { Contact } from './Contact/Contact';
import { IWindowComponentProps } from '../../SystemContext/_static/windows/windows.types';

export const PortfolioWindow = ({ instanceId }: IWindowComponentProps) => {

    return (
        <div 
            className='w-max-content h-full flex flex-col gap-2 justify-center items-center pb-3'
            style={{
                background: '#fffbf7',
                backgroundImage: 'radial-gradient(rgba(175, 175, 175, .2) 1px, transparent 0)',
                backgroundSize: '10px 10px',
                backgroundPosition: '-19px -19px'
            }}
        >
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

            {/* COOL SPINNY COIN THING */}
            <Coin />

            {/* ARTICLES */}
            <ArticlesList />

            {/* CONTACT */}
            <Contact />
        </div>

    )

}