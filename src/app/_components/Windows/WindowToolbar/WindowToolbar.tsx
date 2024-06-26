import React, { useCallback, useMemo, useRef, useState } from 'react';
import { IWindowToolbarProps, WindowToolbarItem, WindowToolbarOption } from './WindowToolbar.types';

export const WindowToolbar = ({ items }: IWindowToolbarProps) => {

    // STATE
    const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

    // REFS
    const openMenuRef = useRef<HTMLDivElement | null>(null);

    // HANDLERS
    const handleOpenMenu = useCallback((itemIndex: number) => {

        if(openItemIndex === itemIndex) {
            setOpenItemIndex(null);
            return
        }

        setOpenItemIndex(itemIndex);
        
        const handleMouseDown = (e: MouseEvent) => {

            if(
                e.target &&
                openMenuRef?.current && 
                !openMenuRef.current.contains(e.target as Element)
            ) {
                setOpenItemIndex(null);
                document.removeEventListener('mousedown', handleMouseDown);
            }
        }

        document.addEventListener('mousedown', handleMouseDown);

    }, [openItemIndex]);

    const handleClickItem = useCallback((e: React.MouseEvent<HTMLButtonElement>, action: WindowToolbarOption['action']) => {
        action(e);
        setOpenItemIndex(null);
    }, []);

    const Items = useMemo(() => {

        return items.map((item, itemIndex) => {

            const isActive = itemIndex === openItemIndex;

            return (
                <div 
                    key={`${item.name}-${itemIndex}`}
                    className='relative px-2 z-10'
                >

                    {/* BUTTON */}
                    <button 
                        onClick={() => handleOpenMenu(itemIndex)}
                    >
                        {item.name}
                    </button>

                    {/* OPTIONS */}
                    {
                        item.options && item.options.length &&
                        <div 
                            className={`win-bezel min-w-32 absolute left-2 bg-[var(--grey)] py-1 px-6 ${isActive ? 'block' : 'hidden'}`}
                            ref={openMenuRef}
                            style={{
                                bottom: '-2rem',
                            }}
                        >
                            {
                                item.options.map((option, optionIndex) => (
                                    <button 
                                        key={`${option.name}-${optionIndex}`}
                                        onClick={(e) => handleClickItem(e, option.action)}
                                    >
                                        {option.name}
                                    </button>
                                ))
                            }
                        </div>
                    }
                   
                </div>
               
            )

        })

    }, [items, openItemIndex]);

    return (
        <div
            className='h-8 w-full flex items-center bg-[var(--grey)] win-bezel'
        >
            {Items}
        </div>
       
       
    )

}
