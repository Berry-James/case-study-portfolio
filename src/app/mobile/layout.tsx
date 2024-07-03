import React, { PropsWithChildren } from 'react';
import { MobileNav } from './_components/MobileNav/MobileNav';

// IMAGES
import CloudsBg from '../_static/backgrounds/clouds.webp';
import { Taskbar } from '../_components/Taskbar/Taskbar';

/**
 * Top layout for all /mobile pages
 * Appends header bar, applies base padding, and appends Taskbar at bottom
 * 
 * @param props.children            Child components
 * @returns Components
 */
const MobileLayout = ({ children }: PropsWithChildren) => {

    return (
        <main
            className='p-4'
            style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',              
                backgroundImage: `url("${CloudsBg.src}")`           
            }}
        >

            {/* MAIN CONTENT */}
            <section 
                className={'win-bezel-thick border bg-white'}
                style={{
                    height: `calc(100vh - ${32 + 32}px)`
                }}
            >
                {/* WINDOW TOOLBAR */}
                <MobileNav />
                
                <div
                    style={{
                        height: `calc(100% - ${24}px)`,
                        overflowY: 'auto'
                    }}
                >
                    {children}  
                </div>
            </section>

            {/* TASKBAR */}
            <Taskbar />

        </main>
    )

}

export default MobileLayout