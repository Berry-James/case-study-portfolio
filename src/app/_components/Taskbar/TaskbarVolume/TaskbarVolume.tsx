'use client';
import React, { ChangeEvent, useContext, useMemo, useState } from 'react';
import { SystemContext } from '../../SystemContext/SystemContext';
import { FaVolumeMute } from 'react-icons/fa';
import { FaVolumeHigh, FaVolumeLow } from 'react-icons/fa6';
import Styles from './TaskbarVolume.module.css';

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
    const { volume, handleSetVolume } = useContext(SystemContext);

    // COMPUTED
    /**
     * Determine the current volume icon based on the current volume value
     */
    const VolumeIcon = useMemo(() => {
        
        if(volume === 0) {
            return <FaVolumeMute />
        }

        if(volume < .5) {
            return <FaVolumeLow />
        }

        return <FaVolumeHigh />
        

    }, [volume]);

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
     * @todo -> this should be a separate boolean, rather than just setting the volume to 0/.2
     * 
     * @returns 
     */
    const handleToggleMute = () => handleSetVolume(volume === 0 ? .2 : 0);

    return (
        <div className='relative flex'>

            {/* VOLUME BUTTON */}
            <button
                onClick={handleToggleIsOpen}
            >
                {VolumeIcon}
            </button>

            {/* VOLUME POPOVER */}
            <div
                className={`${isOpen ? 'block' : 'hidden'} absolute top-0 left-0 flex flex-col items-center generic-box-shadow`}
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
                        checked={volume === 0}
                        onChange={handleToggleMute}
                    />
                    <label htmlFor='mute-checkbox'>Mute</label>
                </div>
               
            </div>

        </div>
        
    )

}