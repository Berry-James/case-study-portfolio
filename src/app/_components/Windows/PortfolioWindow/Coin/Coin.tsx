'use client';
import React, { useEffect, useState } from 'react';
import Styles from './Coin.module.css';

/**
 * Path to image files in public
 */
const BASE_IMG_PATH = '/assets/images/icons/';

/**
 * Array of image names (in public folder)
 * Should correspond to images found in @see BASE_IMAGE_PATH
 */
const IMG_SRC_ARR: string[] = [
    'next.webp',
    'ts.png',
    'figma.webp',
    'laravel.png',
    'nodejs.png',
    'php.png'
]

/**
 * Displays icons of tech skills, rotates 90deg and changes icon every 2 seconds
 * 
 * @returns React Component
 */
export const Coin = () => {

    // STATE
    /**
     * Index of the image we are currently viewing, in the @see IMG_SRC_ARR
     */
    const [imgIndex, setImgIndex] = useState(0);
    /**
     * If true, coin will do fast spin animation
     */
    const [init, setInit] = useState(true);

    // SIDE EFFECTS
    /**
     * On initial run, set timeout for 2 seconds before setting init to false (stop fast coin spin)
     * Afterwards, update the index of the img src every 2 seconds
     */
    useEffect(() => {

        // If initial run, clear init after 2 seconds
        if(init) {
            const timeout = setTimeout(() => {
                setInit(false);
            }, 2000);

            return () => clearTimeout(timeout);
        }

        // Otherwise, set interval to update image src index every 2 seconds
        const interval = setInterval(() => {
            
            setImgIndex((prevState) => {

                // If new index would be greater than array length, set to 0
                if(prevState + 1 === IMG_SRC_ARR.length) {
                    return 0;
                }

                // Otherwise, go to next item in arr
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
                    // style={{ height: '64px', width: '64px' }} 
                />
            </div>
        </div>
       
    )

}