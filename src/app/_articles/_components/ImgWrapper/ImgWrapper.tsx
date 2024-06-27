import React, { useContext } from 'react';
import { ImgWrapperProps } from './ImgWrapper.types';
import Image from 'next/image';
import { SystemContext } from '@/app/_components/SystemContext/SystemContext';
import { windowIdEnum } from '@/app/_components/SystemContext/_static/windows/windows.types';

export const ImgWrapper = ({ src, alt, caption }: ImgWrapperProps) => {

    const { handleOpenWindow } = useContext(SystemContext);

    const isStaticImport = typeof src !== 'string';

    return (
        <div className='p-2 border animate-fade-down'>
            <a 
                className='cursor-pointer'
                onClick={() => handleOpenWindow(windowIdEnum.image, { componentProps: { imgSrc: src } })}
            >
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
            {
                caption && <span className='text-sm'>{ caption }</span>
            }
        </div>
    )

}