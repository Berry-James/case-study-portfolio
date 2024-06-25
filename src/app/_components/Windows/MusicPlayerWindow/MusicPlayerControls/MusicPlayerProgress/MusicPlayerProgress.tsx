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

    /**
     * Position that the range is set to, when scrubbing time
     */
    const [scrubPosition, setScrubPosition] = useState<number | null>(null);

    const [isScrubbing, setIsScrubbing] = useState(false);

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

                    if(audioElement?.paused && interval) {
                        clearInterval(interval);
                        return
                    }
        
                    if(
                        // Audio element has a source
                        audioElement?.src &&
                        // Audio element has a currentTime
                        audioElement?.currentTime !== undefined && 
                        // Track duration is not null (i.e. loadedmetadata event has occurred)
                        trackDuration !== null &&
                        // User is not scrubbing track position
                        !isScrubbing
                    ) {
                        setTrackProgress(audioElement.currentTime);   
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

    }, [audioElement, trackDuration, isScrubbing]);

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

        setIsScrubbing(true);

        console.log('handleSetTrackTime', e.target.value);
        setTrackProgress(() => Number(e.target.value) * (trackDuration / 100));

        if(audioElement && audioElement.currentTime !== undefined) {
            // Set position of audio
            audioElement.currentTime = Number(e.target.value)
        }

    }

    return (
        <input
            className='w-full' 
            type='range' 
            value={trackProgress}
            onChange={handleSetTrackTime}
            min={0}
            max={Math.round(trackDuration)}
            step={.1}
        />
    )

}