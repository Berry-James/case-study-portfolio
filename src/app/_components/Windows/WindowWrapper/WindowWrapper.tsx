'use client';
import React, { useCallback, useContext, useMemo } from 'react';
import Styles from './WindowWrapper.module.css';
import { IWindowWrapperProps } from './WindowWrapper.types';
import { BsTextareaResize } from 'react-icons/bs';
import { useWindowInteractivity } from './hooks/useWindowInteractivity';
import { SystemContext } from '../../SystemContext/SystemContext';
import { WindowPosition, windowStatusEnum } from '../../SystemContext/_static/windows/windows.types';

/**
 * Backbone of ALL system windows.
 * Wraps content of window, and applies resizing, positioning, closing/minimising and other logic
 * 
 * @param props.id                          ID of the window being displayed in WINDOW_DICT
 * @param props.children                    Child components (the window itself)
 * @param props.title                       Title of the window
 * @param props.icon                        Icon to be displayed in window toolbar
 * @param props.defaultWindowPosition       Initial position of the window
 * @param props.instanceId                  ID of this windows instance in the system context
 * 
 * @returns Component
 */
export const WindowWrapper = ({ 
    id, 
    children, 
    title,
    icon, 
    defaultWindowPosition, 
    instanceId,
    rules
}: IWindowWrapperProps) => {

    // CONTEXT
    const { 
        windows, 
        activeWindowInstanceId, 
        handleSetWindowStatus,
        handleSetWindowPosition, 
        handleSetActiveWindowInstanceId,
        handleCloseWindow
    } = useContext(SystemContext);

    /**
     * Custom callback, use to inject side-effects into drag events (or custom compute x/y values)
     */
    const handleDrag = useCallback(({ x, y }: { x: number, y: number }) => {
        return {
            x,
            y
        }
    }, []);

    /**
     * Callback fired on end of resize event.
     * Used to update window position in windows state
     */
    const handleMoveResizeEnd = useCallback((newPos: Partial<WindowPosition>) => {
        handleSetWindowPosition(instanceId, newPos)
    }, [id]);

    /**
     * Enables window drag to reposition, as well as resizing
     */
    const {
        windowRef,
        moveButtonRef, 
        resizeButtonRef, 
        isMoving,
    } = useWindowInteractivity({
        onDrag: handleDrag,
        onDragEnd: handleMoveResizeEnd,
        onResizeEnd: handleMoveResizeEnd,
        initialWindowPosition: defaultWindowPosition,
        windowPosition: windows[instanceId].position
    });

    const isActive = useMemo(() => activeWindowInstanceId === instanceId, [activeWindowInstanceId, instanceId]);

    /**
     * Sets window status to 'closed'
     * @returns 
     */
    const handleClickCloseButton = () => handleCloseWindow(instanceId);

    /**
     * Sets window status to 'minimised'
     * @returns 
     */
    const handleClickMinimiseButton = () => {
        handleSetWindowStatus(instanceId, windowStatusEnum.minimised);
        handleSetActiveWindowInstanceId(null);
    }

    const handleClickWindow = useCallback(() => {
        if(activeWindowInstanceId !== instanceId) {
            handleSetActiveWindowInstanceId(instanceId);
        }
    }, [instanceId, activeWindowInstanceId]);

    /**
     * If no window ID or window is not open, return null
     */
    if(windows[instanceId]?.status !== windowStatusEnum.open) {
        return null;
    }

    return (
        <div 
            className={`${Styles.WindowWrapper} ${isActive ? Styles.WindowWrapperActive : undefined}`}
            style={{
                zIndex: isActive ? 999 : 1,
                borderColor: isActive ? undefined : 'lightsteelblue'   // zIndex: isActive ? 999 : 1,
            }}
            ref={windowRef}
            onMouseDown={isActive ? undefined : handleClickWindow}
        >

            {/* TITLE BAR */}
            <div 
                className={`${Styles.WindowTitleBar} ${isActive && Styles.WindowTitleBarActive} ${isMoving ? 'cursor-grabbing' : 'cursor-grab'}`}
                ref={moveButtonRef}    
            >

                {/* TITLE AND ICON */}
                <div className='flex gap-2 items-center h-full'>
                    <div className='w-4 h-4'>
                        { icon }
                    </div>
                    <span className='whitespace-nowrap'>{ title }</span>
                </div>
               
                {/* WINDOW BUTTONS */}
                <div className='flex gap-1 items-center h-full'>

                    {/* MINIMISE BUTTON */}
                    {
                        !rules?.disableMinimise &&
                        <button 
                            onClick={handleClickMinimiseButton}
                            className='!p-0 icon-button h-4 w-4 flex justify-center items-center box-content'
                        >
                            _
                        </button>
                    }

                    {/* CLOSE BUTTON */}
                    {
                        !rules?.disableClose &&
                        <button 
                            onClick={handleClickCloseButton}
                            className='!p-0 icon-button h-4 w-4 flex justify-center items-center box-content'
                        >
                        &times;
                    </button>
                    }
                   
                </div>
              
            </div>

            {/* BODY */}
            <div
                className={Styles.WindowContent}
            >
                { children }
            </div>

            {/* RESIZE BUTTON */}
            <button
                ref={resizeButtonRef}
                className={`absolute bottom-0 right-0 cursor-nwse-resize z-10`}
            >
                <BsTextareaResize />
            </button>
        </div>
    )

}
