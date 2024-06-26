import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
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

    const rangeSliderRef = useRef<HTMLInputElement | null>(null);

    // SIDE EFFECTS
    /**
     * Adds listener to audioElement to extract duration
     * Sets interval to track playback progress
     */
    useEffect(() => {

        if(audioElement) {

            const timeUpdateListener = (e: Event) => {
                console.log('TIME UPDATD!!');
                if(rangeSliderRef.current) {
                    rangeSliderRef.current.value = String((e.target as HTMLAudioElement).currentTime)
                }
            }
            
            // Set listener on audio tag to get metadata
            const loadedMetaDataListener = () => {
                if(audioElement?.duration !== undefined) {
                    if(rangeSliderRef.current) {
                        rangeSliderRef.current.min = '0';
                        rangeSliderRef.current.max = String(audioElement.duration);
                    }
                    setTrackDuration(audioElement.duration)
                }


            }

            audioElement.addEventListener('loadedmetadata', loadedMetaDataListener);

            audioElement.addEventListener('timeupdate', timeUpdateListener);

            return () => {
                audioElement.removeEventListener('loadedmetadata', loadedMetaDataListener);
                audioElement.removeEventListener('timeupdate', timeUpdateListener);
                // if(interval) {
                //     clearInterval(interval);
                // }
            }

        }

    }, [audioElement]);

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

        if(audioElement && audioElement.currentTime !== undefined) {
            // Set position of audio
            audioElement.currentTime = Number(e.target.value)
        }

    }

    return (
        // <div className='grid grid-cols-[max-content_1fr_max-content] gap-1'>
        <div>
            {/* <span className='text-center'>0:00</span> */}
            <input
                className='w-full' 
                type='range' 
                onChange={handleSetTrackTime}
                step={1}
                ref={rangeSliderRef}
            />
            {/* <span className='text-center'>{new Date(trackDuration * 1000).toISOString().substring(1, 19)}</span> */}
        </div>

    )

}