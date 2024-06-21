'use client';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { MusicPlayerWindowContext } from '../context/MusicPlayerWindowContext';
import { MUSIC_PLAYER_WINDOW_TRACK_LIST } from '../MusicPlayerWindow.static';
import { MusicPlayerProgress } from './MusicPlayerProgress/MusicPlayerProgress';
import { FaPause, FaPlay, FaStop } from 'react-icons/fa';
import { SystemContext } from '@/app/_components/SystemContext/SystemContext';

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
    const handleClickPlayPause = () => {
        if(isPlaying) {
            handlePause();
            return
        }
        handlePlay();
    }

    return (
        <div className='p-2'>

            {/* PROGRESS RANGE INPUT */}
            <div className='w-full px-4'>
                <MusicPlayerProgress audioElement={audioRef.current}  />
            </div>

            {/* CONTROL BUTTONS */}
            <div className='flex justify-center items-center gap-2'>
                <button className='icon-button' onClick={handleClickPlayPause}>
                    { 
                        isPlaying ? 
                        <FaPause /> : <FaPlay />
                    }
                </button>
                <button 
                    className='icon-button'
                    onClick={handleStop}
                >
                    <FaStop />
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