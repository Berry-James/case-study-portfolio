'use client';
import React, { ChangeEvent, useContext, useState } from 'react';
import { SystemContext } from '../../SystemContext/SystemContext';
import Styles from './TaskbarVolume.module.css';
import VolumeIcon from '../../../_static/icons/png/loudspeaker_rays-1.png'
import VolumeMuteIcon from '../../../_static/icons/png/loudspeaker_muted-1.png'
import Image from 'next/image';

/**
 * Volume slider used to control volume of all system Audio
 * 
 * @returns Component
 */
export const TaskbarVolume = () => {

    // STATE
    /**
     * Is the volume slider popover open?
     */
    const [isOpen, setIsOpen] = useState(false);

    // CONTEXT
    const { volume, isMuted, handleSetIsMuted, handleSetVolume } = useContext(SystemContext);

    // HANDLERS
    /**
     * Toggles open state of volume modal
     * 
     * @returns void
     */
    const handleToggleIsOpen = () => setIsOpen(!isOpen);
    
    /**
     * Updates the volume on change of range input
     * 
     * @param e             ChangeEvent from range input
     */
    const handleChangeRange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e?.target?.value !== undefined) {
            handleSetVolume(parseFloat(e.target.value))
        }
    }
    
    /**
     * Toggles the mute
     * 
     * @returns void
     */
    const handleToggleMute = () => handleSetIsMuted(!isMuted);

    return (
        <div className='relative flex'>

            {/* VOLUME BUTTON */}
            <button
                onClick={handleToggleIsOpen}
            >
                <Image 
                    width={18}
                    height={18}
                    src={isMuted ? VolumeMuteIcon : VolumeIcon}
                    alt={''}
                />
            </button>

            {/* VOLUME POPOVER */}
            <div
                className={`${isOpen ? 'block' : 'hidden'} absolute top-0 left-0 flex flex-col items-center win-bezel`}
                style={{
                    backgroundColor: 'var(--grey)',
                    top: `-212px`,
                    left: '-120px',
                    height: '200px',
                    width: '160px'
                }}
            >
                <span>Volume</span>

                {/* RANGE SLIDER */}
                <input 
                    value={volume}
                    onChange={handleChangeRange}
                    type='range'
                    className={`${Styles.RangeInput} h-full`}
                    min={0}
                    max={1}
                    step={0.1}
                    style={{
                        writingMode: 'vertical-lr',
                        direction: 'rtl',
                    }}
                />

                {/* MUTE CHECKBOX */}
                <div className='flex items-center gap-1'>
                    <input 
                        id='mute-checkbox' 
                        type='checkbox' 
                        checked={isMuted}
                        onChange={handleToggleMute}
                    />
                    <label htmlFor='mute-checkbox'>Mute</label>
                </div>
               
            </div>

        </div>
        
    )

}