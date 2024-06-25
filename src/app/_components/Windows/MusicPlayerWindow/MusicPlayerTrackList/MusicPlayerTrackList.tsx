import React, { useCallback, useContext } from 'react';
import { MUSIC_PLAYER_WINDOW_TRACK_LIST } from '../MusicPlayerWindow.static';
import { MusicPlayerWindowContext } from '../context/MusicPlayerWindowContext';

/**
 * Displays a list of all audio tracks available
 * 
 * @returns Component
 */
export const MusicPlayerTrackList = () => {

    // CONTEXT
    const { handleSetPlayingTrackId, playingTrackId } = useContext(MusicPlayerWindowContext);

    // HANDLERS
    /**
     * Handles setting the playingTrackId to the chosen track
     */
    const handleClickTrack = useCallback((trackId: string) => {

        if(playingTrackId === trackId) {
            return
        }

        handleSetPlayingTrackId(trackId);

    }, [playingTrackId]);

    return (
        <div className='px-2'>

            {/* TITLE */}
            <span>Tracks ({MUSIC_PLAYER_WINDOW_TRACK_LIST.length})</span>
            
            {/* LIST */}
            <ol
                className='px-2 bg-white'
            >
                {MUSIC_PLAYER_WINDOW_TRACK_LIST.map((track, trackIndex) => {
                    return (
                        <li key={track.id} className='border-b'>
                            <button onClick={() => handleClickTrack(track.id)}>
                                {trackIndex + 1}. {track.name}
                            </button>
                        </li>
                    )
                })}
            </ol>
        </div>
       
    )

}