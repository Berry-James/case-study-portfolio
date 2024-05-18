import React from 'react';
import { ArticlesList } from './ArticlesList/ArticlesList';
import { ARTICLES } from '../_static/static';

export const Home = () => {

    return (
        <main className="flex min-h-screen flex-col justify-center items-center p-24">
            <h1>
                James Berry
            </h1>
            <span>Full-Stack Software Developer</span>
            <br />
            <p>Case Study Archive</p>
            <ArticlesList 
                articles={ARTICLES}
            />
        </main>
    )

}