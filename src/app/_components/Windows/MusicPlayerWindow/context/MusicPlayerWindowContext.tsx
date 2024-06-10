import React, { PropsWithChildren, createContext, useState } from 'react';
import { IMusicPlayerWindowContext } from './MusicPlayerWindowContext.types';

/**
 * Functional context for the Music Player window/application
 * @implements {IMusicPlayerWindowContext}
 * 
 * @returns Context
 */
export const MusicPlayerWindowContext = createContext<IMusicPlayerWindowContext>({
    playingTrackId: null,
    handleSetPlayingTrackId: (newPlayingTrackId: string) => undefined
});

/**
 * Context provider for @see {MusicPlayerWindowContext}
 * 
 * @param props.children            Child components
 * @returns Component
 */
export const MusicPlayerWindowContextProvider = ({ children }: PropsWithChildren) => {

    // STATE
    /**
     * ID of the currently playing track
     */
    const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

    // HANDLERS
    /**
     * Updates the currently playing track ID to the given value
     * 
     * @param newPlayingTrackId 
     * @returns void
     */
    const handleSetPlayingTrackId = (newPlayingTrackId: string) => setPlayingTrackId(newPlayingTrackId);

    return (
        <MusicPlayerWindowContext.Provider
            value={{
                playingTrackId,
                handleSetPlayingTrackId
            }}
        >
            { children }
        </MusicPlayerWindowContext.Provider>
    )

}