import React from 'react';
import { MusicPlayerWindowContextProvider } from './context/MusicPlayerWindowContext';
import { MusicPlayerControls } from './MusicPlayerControls/MusicPlayerControls';
import { IDocumentWindowProps } from '../DocumentWindow/DocumentWindow.types';
import { MusicPlayerTrackList } from './MusicPlayerTrackList/MusicPlayerTrackList';
import { MusicPlayerVisualiser } from './MusicPlayerVisualiser/MusicPlayerVisualiser';

/**
 * Window/application for playing music
 * @implements {IDocumentWindowProps}
 * 
 * @param props         Standard window props
 * @returns Component
 */
export const MusicPlayerWindow = (props: IDocumentWindowProps) => {

    return (
        <MusicPlayerWindowContextProvider>
            <div className='p-2'>
                <MusicPlayerVisualiser />
                <MusicPlayerControls />
                <MusicPlayerTrackList />
            </div>
           
        </MusicPlayerWindowContextProvider>
    )

}