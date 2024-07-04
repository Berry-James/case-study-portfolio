'use client';
import React, { useContext, useRef } from 'react';
import { IDocumentWindowProps } from '@/app/_components/Windows/DocumentWindow/DocumentWindow.types';
import { WindowActions } from '@/app/_components/Windows/WindowActions/WindowActions';
import { SystemContext } from '@/app/_components/SystemContext/SystemContext';
import Image from 'next/image';
import { windowIdEnum } from '@/app/_components/SystemContext/_static/windows/windows.types';
import { LoginWindowSuccessDialog } from './LoginWindowSuccessDialog/LoginWindowSuccessDialog';
import { centerWindow } from '@/utils/windowUtils';
import { WINDOWS_DICT } from '@/app/_components/SystemContext/_static/windows/windows.static';

// IMAGES
import BrandingImage from '../../../_static/imgs/branding.png';
import CloudBg from '../../../_static/imgs/welcome_clouds.jpg';

/**
 * Mock login window, meant to emulate windows 98/2000 (loosely)
 * No actual auth is implemented as it is unecessary
 * 
 * @param props                 Standard doc window props
 * @returns Component
 */
export const LoginWindow = (props: IDocumentWindowProps) => {

    // CONTEXT
    const { clearAllWindows, handleOpenWindow } = useContext(SystemContext);

    // REFS
    /**
     * Ref of password input
     */
    const passwordRef = useRef<HTMLInputElement | null>(null);

    /**
     * Ref of user select
     */
    const userSelectRef = useRef<HTMLSelectElement | null>(null);

    // HANDLERS
    /**
     * Starts a fake login process
     * - Clears open windows
     * - Opens 'loading' dialog, which handles redirecting user to root
     * 
     * @param e             The form event
     * @returns void
     */
    const handleLogin = async (e: React.FormEvent) => {
        // Cancel form default
        e.preventDefault();

        // Close all windows
        clearAllWindows();

        // Open dialog window
        handleOpenWindow(
            windowIdEnum.dialog, 
            { 
                componentProps: { 
                    children: <LoginWindowSuccessDialog />,
                },
                position: centerWindow(WINDOWS_DICT[windowIdEnum.dialog].position)
            }
        );
    }

    return (
        <form onSubmit={handleLogin}>
            <div 
                className='p-4'
                style={{
                    background: `linear-gradient(0deg, rgba(192,192,192,1) 45%, rgba(192,192,192,0) 100%), url("${CloudBg.src}") top/cover no-repeat`
                }}
            >
                {/* LOGO */}
                <div
                    className='relative w-full pl-2'
                >
                    <Image 
                        src={BrandingImage}
                        height={64}
                        alt=''
                        className='z-10 relative'
                        
                    />
                </div>

                {/* USER SELECT */}
                <div className='flex flex-col gap-1 mt-12'>
                    <label htmlFor='user-select'>Select user</label>
                    <select 
                        multiple 
                        id='user-select'
                        ref={userSelectRef}
                        style={{ overflow: 'auto' }}
                        className='win-bezel-inverted'
                        defaultValue={['1']}
                    >
                        <option value={'1'}>James</option>
                    </select>
                </div>
            

                {/* PASSWORD INPUT */}
                <div className='flex flex-col gap-1 mt-4'>
                    <label htmlFor='password'>Password</label>
                    <input 
                        id='password' 
                        type='password' 
                        ref={passwordRef}
                        className='win-bezel-inverted'
                        defaultValue={'password :^)'}
                        required

                    />
                </div>

                {/* ACTIONS */}
                <WindowActions 
                    actions={{
                        onOkay: handleLogin,
                    }}
                />
            </div>
        </form>
     
    )

}