import React from 'react';

// ICONS
import CdImage from '../../../../_static/icons/png/cd_audio_cd_a-3.png'
import Image from 'next/image';

/**
 * Simple 'visualiser', aiming to mimic windows 98 media player
 * TODO -> add some cool visualisations to this
 * 
 * @returns Component
 */
export const MusicPlayerVisualiser = () => {

    return (
        <div
            className='bg-black h-48 w-full flex justify-center items-center'
        >
            <Image 
                src={CdImage}
                width={64}
                height={64}
                alt=''
                style={{
                    imageRendering: 'pixelated'
                }}
            />
        </div>
    )

}