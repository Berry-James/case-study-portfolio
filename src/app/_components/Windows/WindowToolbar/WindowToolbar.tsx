import React, { useCallback, useMemo, useRef, useState } from 'react';
import { IWindowToolbarProps, WindowToolbarItem, WindowToolbarOption } from './WindowToolbar.types';

/**
 * Generic windows-style toolbar for any window
 * Takes items with sub items
 * TODO -> Store array of refs for buttons and menus, rather than overriding (won't work for more than one item) 
 * 
 * @param props.items           Array of buttons/dropdowns to be displayed at top of window
 * @returns Component
 */
export const WindowToolbar = ({ items }: IWindowToolbarProps) => {

    // STATE
    /**
     * Store index of open dropdown
     */
    const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

    // REFS
    /**
     * Store ref of open dropdown div
     */
    const openMenuRef = useRef<HTMLUListElement | null>(null);

    /**
     * Store remove event listener function
     */
    const mouseDownUnsub = useRef<Function | null>(null);

    // HANDLERS
    /**
     * Callback for opening a given menu by its index
     */
    const handleOpenMenu = useCallback((itemIndex: number) => {

        // If already open, close it
        if(openItemIndex === itemIndex) {
            setOpenItemIndex(null);
            return
        }

        // Revoke any previous event listener
        if(mouseDownUnsub.current) {
            mouseDownUnsub.current()
        }

        // Set state
        setOpenItemIndex(itemIndex);
        
        // Create mouse down event, listening for clickaway
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

        // Store remove listener function
        mouseDownUnsub.current = () => {
            document.removeEventListener('mousedown', handleMouseDown)
        }

        // Append clickaway listener
        document.addEventListener('mousedown', handleMouseDown);

    }, [openItemIndex]);

    /**
     * Callback which fires the action of a button within a dropdown, and then closes the dropdown
     */
    const handleClickItem = useCallback((e: React.MouseEvent<HTMLButtonElement>, action: WindowToolbarOption['action']) => {

        e.stopPropagation();

        action(e);
        setOpenItemIndex(null);
    }, []);

    // COMPUTED
    /**
     * Compute a list of all items to display and memoise
     */
    const Items = useMemo(() => {

        return items.map((item, itemIndex) => {

            // Dropdown is open
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
                        <ul 
                            className={`win-bezel min-w-32 absolute left-2 bg-[var(--grey)] py-1 px-6 ${isActive ? 'block' : 'hidden'}`}
                            ref={openMenuRef}
                        >
                            {
                                item.options.map((option, optionIndex) => (
                                    <li key={`${option.name}-${optionIndex}`}>
                                        <button 
                                            key={`${option.name}-${optionIndex}`}
                                            onClick={(e) => handleClickItem(e, option.action)}
                                        >
                                            {option.name}
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
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
 