import React, { ChangeEvent, useEffect, useState } from 'react';
import { IMusicPlayerProgressProps } from './MusicPlayerProgress.types';

/**
 * Displays the progress of the currently playing track via a html 'range' input
 * 
 * @param props.audioElement            The audio tag element
 * @returns Component
 */
export const MusicPlayerProgress = ({ audioElement }: IMusicPlayerProgressProps) => {

    // STATE
    /**
     * Duration of the track in seconds (float)
     */
    const [trackDuration, setTrackDuration] = useState(0);

    /**
     * Percentage progress of the track to completion (value/100)
     */
    const [trackProgress, setTrackProgress] = useState(0);

    // SIDE EFFECTS
    /**
     * Adds listener to audioElement to extract duration
     * Sets interval to track playback progress
     */
    useEffect(() => {

        if(audioElement) {
            
            // Set listener on audio tag to get metadata
            const loadedMetaDataListener = () => {
                if(audioElement?.duration !== undefined) {
                    setTrackDuration(audioElement.duration)
                }
            }

            audioElement.addEventListener('loadedmetadata', loadedMetaDataListener);

            let interval: NodeJS.Timeout | null = null;

            if(
                audioElement?.src &&
                audioElement?.currentTime !== undefined && 
                trackDuration !== null
            ) {
                interval = setInterval(() => {

                    console.log('PAUSED', audioElement?.paused)

                    if(audioElement?.paused && interval) {
                        clearInterval(interval);
                        return
                    }
        
                    if(
                        audioElement?.src &&
                        audioElement?.currentTime !== undefined && 
                        trackDuration !== null
                    ) {
                        console.log('setTrackProgress');
                        setTrackProgress((audioElement.currentTime / trackDuration) * 100);   
                    }
        
                }, 1000);
            }


            return () => {
                audioElement.removeEventListener('loadedmetadata', loadedMetaDataListener);
                if(interval) {
                    clearInterval(interval);
                }
            }

        }

    }, [audioElement, trackDuration]);

    /**
     * WIP Sets the current playback position in the track
     * @alpha
     * 
     * @param e             ChangeEvent for the range input
     * @returns void
     */
    const handleSetTrackTime = (e: ChangeEvent<HTMLInputElement>) => {

        if(!audioElement) {
            return null;
        }

        console.log('handleSetTrackTime');
        setTrackProgress(() => Number(e.target.value) * (trackDuration / 100))

    }

    useEffect(() => {
        console.log('trackProgress', trackProgress);
    }, [trackProgress]);

    return (
        <div
            className='grid grid-cols-3 w-full'
        >
            <input
                className='w-full' 
                type='range' 
                value={trackProgress}
                onChange={handleSetTrackTime}
                min={0}
                max={100}
                step={.1}
            />
        </div>


    )

}