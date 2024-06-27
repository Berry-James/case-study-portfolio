import React from 'react';
import { PaintWindowContextProvider } from './context/PaintWindowContext';
import { PaintWindowCanvas } from './PaintWindowCanvas/PaintWindowCanvas';
import { PaintWindowFooter } from './PaintWindowFooter/PaintWindowFooter';
import { PaintWindowControls } from './PaintWindowControls/PaintWindowControls';
import { PaintWindowToolbar } from './PaintWindowToolbar/PaintWindowToolbar';
import { IWindowComponentProps } from '../../SystemContext/_static/windows/windows.types';

/**
 * A window which aims to emulate Microsoft Paint in windows 98 (with less features)
 * 
 * @param props         Regular window props
 * @returns Component
 */
export const PaintWindow = (props: IWindowComponentProps) => {

    return (
        <PaintWindowContextProvider>
            <PaintWindowContent />
        </PaintWindowContextProvider>
    )

}

/**
 * Content for PaintWindow component
 * @see {PaintWindow}
 * 
 * @returns Component
 */
const PaintWindowContent = () => {

    return (
        <div className='h-full w-full flex flex-col'>

            {/* TOOLBAR */}
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

                    {/* CONTROLS */}
                    <PaintWindowControls />

                    {/* CANVAS */}
                    <PaintWindowCanvas />

                </div>
               

                <div
                    style={{
                        gridColumn: '1 / 3'
                    }}
                >

                    {/* FOOTER */}
                    <PaintWindowFooter />                
                </div>
            </div>
        </div>
       
    )

}