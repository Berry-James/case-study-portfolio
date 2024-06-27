import React from 'react';
import { IWindowComponentProps } from '../../SystemContext/_static/windows/windows.types';
import Image from 'next/image';

/**
 * Simple window used to display a single image
 * @implements {IWindowComponentProps}
 * 
 * @param props             Standard Window component props
 * @returns Component
 */
export const ImageWindow = (props: IWindowComponentProps<{ imgSrc?: string }>) => {

    return (
        <div className='flex justify-center items-center p-4 h-full'>
            {
                props.imgSrc &&
                <Image 
                    alt=''
                    src={props.imgSrc}
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{ width: '100%', height: 'auto' }} // optional
                />
            }
         
        </div>
    )

}