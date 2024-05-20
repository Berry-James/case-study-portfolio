import React from 'react';
import { ImgWrapperProps } from './ImgWrapper.types';
import Image from 'next/image';

export const ImgWrapper = ({ src, alt, caption }: ImgWrapperProps) => {

    return (
        <div className='p-2 border animate-fade-down'>
            <Image
                alt={alt || ''} 
                src={src}
                width={0}
                height={0}
                sizes='60vw'
                style={{ width: '100%', height: 'auto' }} // optional
            />
            {
                caption && <span className='text-sm'>{ caption }</span>
            }
        </div>
    )

}