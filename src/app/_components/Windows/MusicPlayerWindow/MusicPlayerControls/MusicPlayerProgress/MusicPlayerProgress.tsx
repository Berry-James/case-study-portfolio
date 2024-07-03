import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { IMusicPlayerProgressProps } from './MusicPlayerProgress.types';
import Styles from './MusicPlayerProgress.module.css';

/**
 * Displays the progress of the currently playing track via a html 'range' input
 * TODO -> clean up some of the unused states here, have been left in in case of future implementation
 * 
 * @param props.audioElement            The audio tag element
 * @returns Component
 */
export const MusicPlayerProgress = ({ audioElement }: IMusicPlayerProgressProps) => {

    // STATE
    /**
     * Duration of the track in seconds (float)
     */
    // const [trackDuration, setTrackDuration] = useState(0);

    const rangeSliderRef = useRef<HTMLInputElement | null>(null);

    // SIDE EFFECTS
    /**
     * Adds listener to audioElement to extract duration
     * Sets interval to track playback progress
     */
    useEffect(() => {

        if(audioElement) {

            // Create listener to timeUpdate event
            const timeUpdateListener = (e: Event) => {
                // Update value in rangeSlider element
                if(rangeSliderRef.current) {
                    rangeSliderRef.current.value = String((e.target as HTMLAudioElement).currentTime)
                }
            }
            
            // Set listener on audio tag to get metadata
            const loadedMetaDataListener = () => {
                if(audioElement?.duration !== undefined) {
                    if(rangeSliderRef.current) {
                        // Assign min and max values on range slider
                        rangeSliderRef.current.min = '0';
                        rangeSliderRef.current.max = String(audioElement.duration);
                    }
                    // setTrackDuration(audioElement.duration)
                }
            }

            // Assign listeners
            audioElement.addEventListener('loadedmetadata', loadedMetaDataListener);
            audioElement.addEventListener('timeupdate', timeUpdateListener);

            // Cleanup listeners
            return () => {
                audioElement.removeEventListener('loadedmetadata', loadedMetaDataListener);
                audioElement.removeEventListener('timeupdate', timeUpdateListener);
            }

        }

    }, [audioElement]);

    /**
     * Sets the current playback position in the track
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
        <div>
            <input
                className={`${Styles.ProgressRangeInput} win-bezel-inverted`}
                type='range' 
                onChange={handleSetTrackTime}
                step={1}
                ref={rangeSliderRef}
                defaultValue={0}
            />
        </div>

    )

}