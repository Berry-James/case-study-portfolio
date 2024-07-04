import React, { useContext } from 'react';
import { ImgWrapperProps } from './ImgWrapper.types';
import Image from 'next/image';
import { SystemContext } from '@/app/_components/SystemContext/SystemContext';
import { windowIdEnum } from '@/app/_components/SystemContext/_static/windows/windows.types';

/**
 * Image wrapper for article component
 * Adds styling and optional image caption
 * @implements {ImgWrapperProps}
 * 
 * @param props.src             Source for image (string path or static import)
 * @param props.alt             (Optional) Alt text for image
 * @param props.caption         (Optional) Caption to be displayed beneath image
 * 
 * @returns Component
 */
export const ImgWrapper = ({ src, alt, caption }: ImgWrapperProps) => {

    // CONTEXT
    const { handleOpenWindow } = useContext(SystemContext);

    // VARS
    const isStaticImport = typeof src !== 'string';

    return (
        <div className='p-2 border animate-fade-down'>
            <a 
                className='cursor-pointer'
                onClick={() => handleOpenWindow(windowIdEnum.image, { componentProps: { imgSrc: src } })}
            >

                {/* IMAGE */}
                <Image
                    placeholder={isStaticImport ? 'blur' : undefined}
                    alt={alt || ''} 
                    src={src}
                    width={0}
                    height={0}
                    sizes='60vw'
                    style={{ width: '100%', height: 'auto' }} // optional
                />
            </a>

            {/* CAPTION */}
            {
                caption && <span className='text-sm'>{ caption }</span>
            }
        </div>
    )

}
