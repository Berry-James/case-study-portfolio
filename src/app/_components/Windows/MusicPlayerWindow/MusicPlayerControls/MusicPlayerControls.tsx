'use client';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { MusicPlayerWindowContext } from '../context/MusicPlayerWindowContext';
import { MUSIC_PLAYER_WINDOW_TRACK_LIST } from '../MusicPlayerWindow.static';
import { MusicPlayerProgress } from './MusicPlayerProgress/MusicPlayerProgress';
import { FaForward, FaPause, FaPlay, FaStop } from 'react-icons/fa';
import { SystemContext } from '@/app/_components/SystemContext/SystemContext';
import { RiForwardEndMiniFill, RiRewindMiniFill, RiRewindStartFill, RiRewindStartMiniFill } from 'react-icons/ri';
import { BiFastForward } from 'react-icons/bi';
import { FaForwardFast } from 'react-icons/fa6';

/**
 * Controls for the MusicPlayer window/application
 * @see {MusicPlayer}
 * 
 * @returns Component
 */
export const MusicPlayerControls = () => {

    // STATE
    /**
     * Whether or not the current track is playing
     */
    const [isPlaying, setIsPlaying] = useState(false);

    // CONTEXT
    const { playingTrackId, handleSetPlayingTrackId } = useContext(MusicPlayerWindowContext);
    const { volume, isMuted } = useContext(SystemContext);

    // REFS
    /**
     * Reference to the audio tag
     */
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // COMPUTED
    /**
     * Determine currently playing track by playingTrackId
     */
    const playingTrack = useMemo(() => MUSIC_PLAYER_WINDOW_TRACK_LIST.find(track => track.id === playingTrackId), [playingTrackId]);

    /**
     * if a track is selected, start playing it
     */
    useEffect(() => {
        if(audioRef.current) {
            if(playingTrack?.src) {
                audioRef.current.play();
                if(volume <= 1) {
                    audioRef.current.volume = volume;
                }
                setIsPlaying(true);
            }
        }
    }, [playingTrack]);

    /**
     * Update the song volume whenever volume global state changes
     */
    useEffect(() => {
      
        if(audioRef.current) {

            // If volume muted from system tray
            if(isMuted) {
                audioRef.current.volume = 0;
            }

            // If volume above 0 and below 1
            else if(volume <= 1 && volume >= 0) {
                audioRef.current.volume = volume;
            }
        }
    }, [volume, isMuted]);

    /**
     * Triggers a pause on the audio
     */
    const handlePause = useCallback(() => {
        if(audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, []);

    /**
     * Triggers the audio to play
     */
    const handlePlay = useCallback(() => {
        if(audioRef.current) {

            // If no track src, set the playing track ID to the latest track
            if(!playingTrack?.src) {
                handleSetPlayingTrackId(MUSIC_PLAYER_WINDOW_TRACK_LIST[0].id);
            }
            audioRef.current.play();

            setIsPlaying(true);
          
        }
    }, []);
    
    /**
     * Pauses the current audio, and sets playback time to the start
     */
    const handleStop = useCallback(() => {
        if(audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }, []);

    /**
     * Toggles between playing/pausing the current track, depending on isPlaying state
     */
    // const handleClickPlayPause = () => {
    //     if(isPlaying) {
    //         handlePause();
    //         return
    //     }
    //     handlePlay();
    // }

    return (
        <div className='p-2'>

            {/* PROGRESS RANGE INPUT */}
            <MusicPlayerProgress audioElement={audioRef.current} />

            {/* CONTROL BUTTONS */}
            <div className='flex items-center gap-3'>
                <button onClick={handlePlay}>
                    <FaPlay />
                </button>
                <button 
                    onClick={handlePause} 
                    disabled={!isPlaying}
                    className={isPlaying ? 'opacity-100' : 'opacity-50'}
                >
                    <FaPause /> 
                </button>
                <button 
                    onClick={handleStop}
                    disabled={!isPlaying}
                    className={isPlaying ? 'opacity-100' : 'opacity-50'}
                >
                    <FaStop />
                </button>

                <hr className='h-6 w-[2px] win-bezel-inverted' />

                <button disabled={!isPlaying} className={isPlaying ? 'opacity-100' : 'opacity-50'}>
                    <FaForwardFast className='rotate-180' />
                </button>

                <button disabled={!isPlaying} className={isPlaying ? 'opacity-100' : 'opacity-50'}>
                    <FaForward className='rotate-180' />
                </button>

                <button disabled={!isPlaying} className={isPlaying ? 'opacity-100' : 'opacity-50'}>
                    <FaForward />
                </button>

                <button disabled={!isPlaying} className={isPlaying ? 'opacity-100' : 'opacity-50'}>
                    <FaForwardFast  />
                </button>

            </div>
            
            {/* AUDIO ELEMENT */}
            <audio 
                ref={audioRef}
                src={playingTrack?.src}
            />
        
        </div>
    )

}