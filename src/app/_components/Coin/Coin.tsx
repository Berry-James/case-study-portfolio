'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Styles from './Coin.module.css';

const BASE_IMG_PATH = '/assets/images/icons/'
const IMG_SRC_ARR: string[] = [
    'next-js.png',
    'ts.png',
    'figma.jpg',
    'laravel.png',
    'nodejs.png',
    'php.png'
]

export const Coin = () => {

    // STATE
    const [imgIndex, setImgIndex] = useState(0);
    const [init, setInit] = useState(true);

    // SIDE EFFECTS
    /**
     * Update the index of the img src every 2 seconds
     */
    useEffect(() => {

        if(init) {
            const timeout = setTimeout(() => {
                setInit(false);
            }, 2000);

            return () => clearTimeout(timeout);
        }

        const interval = setInterval(() => {
            
            setImgIndex((prevState) => {
                if(prevState + 1 === IMG_SRC_ARR.length) {
                    return 0;
                }
                return prevState + 1;
            })
        }, 2000);

        return () => clearInterval(interval);

    }, [init]);

    return (
        <div className='animate-flip-up'>
            <div 
                className={`${init ? Styles.CoinIntro : imgIndex % 2 === 0 ? Styles.CoinFirst : Styles.CoinLast}`}
            >
                <img 
                    alt={''}
                    src={`${BASE_IMG_PATH}${IMG_SRC_ARR[imgIndex]}`}
                    height={64}
                    width={64}
                    priority
                    // style={{ height: '64px', width: '64px' }} 
                />
            </div>
        </div>
       
    )

}