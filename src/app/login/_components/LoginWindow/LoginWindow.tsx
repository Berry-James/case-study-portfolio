import React, { useContext, useRef } from 'react';
import { IDocumentWindowProps } from '@/app/_components/Windows/DocumentWindow/DocumentWindow.types';
import { WindowActions } from '@/app/_components/Windows/WindowActions/WindowActions';
import { SystemContext } from '@/app/_components/SystemContext/SystemContext';
import { useRouter } from 'next/navigation';
import { PAGE_ROUTES } from '@/network/pageRoutes';

export const LoginWindow = (props: IDocumentWindowProps) => {

    // CONTEXT
    const { clearAllWindows } = useContext(SystemContext);

    // ROUTER
    const router = useRouter();

    // REFS
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const userSelectRef = useRef<HTMLSelectElement | null>(null);

    // HANDLERS
    const handleLogin = () => {
        setTimeout(() => {
            clearAllWindows();
            setTimeout(() =>  router.push(PAGE_ROUTES.root), 1000)
        }, 500);
    }

    return (
       <div className='p-4 flex flex-col gap-4'>
            {/* LOGO */}
            <div>LOGO HERE!!!</div>

            {/* USER SELECT */}
            <div className='flex flex-col gap-1'>
                <label htmlFor='user-select'>Select user name</label>
                <select 
                    multiple 
                    id='user-select'
                    ref={userSelectRef}
                    style={{ overflow: 'auto' }}
                    className='win-bezel-inverted'
                >
                    <option value={'James'}>James</option>
                </select>
            </div>
           

            {/* PASSWORD INPUT */}
            <div className='flex flex-col gap-1'>
                <label htmlFor='password'>Password</label>
                <input 
                    id='password' 
                    type='password' 
                    ref={passwordRef}
                    className='win-bezel-inverted'

                />
            </div>

            {/* ACTIONS */}
            <WindowActions 
                actions={{
                    onOkay: handleLogin,
                    onCancel: () => {}
                }}
            />
       </div>
    )

}