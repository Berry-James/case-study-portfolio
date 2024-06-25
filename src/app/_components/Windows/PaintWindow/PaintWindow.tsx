import React from 'react';
import { PaintWindowContextProvider } from './context/PaintWindowContext';
import { PaintWindowCanvas } from './PaintWindowCanvas/PaintWindowCanvas';
import { IDocumentWindowProps } from '../DocumentWindow/DocumentWindow.types';
import { PaintWindowFooter } from './PaintWindowFooter/PaintWindowFooter';
import { PaintWindowControls } from './PaintWindowControls/PaintWindowControls';
import { PaintWindowToolbar } from './PaintWindowToolbar/PaintWindowToolbar';

export const PaintWindow = (props: IDocumentWindowProps) => {

    return (
        <PaintWindowContextProvider>
            <PaintWindowContent />
        </PaintWindowContextProvider>
    )

}

const PaintWindowContent = () => {

    return (
        <div className='h-full w-full flex flex-col'>
            <PaintWindowToolbar />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >
                <div
                    className='flex h-full'
                >
                    <PaintWindowControls />
                    <PaintWindowCanvas />
                </div>
               

                <div
                    style={{
                        gridColumn: '1 / 3'
                    }}
                >

                    {/* FOOTER W/ZOOM */}
                    <PaintWindowFooter />                
                </div>
            </div>
        </div>
       
    )

}