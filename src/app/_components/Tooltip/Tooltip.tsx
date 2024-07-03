import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { ITooltipProps } from './Tooltip.types';
import Styles from './Tooltip.module.css';

/**
 * WIP custom tooltip component
 * 
 * @param anchorEl          HTML element to attach tooltip to
 * @param position          (WIP) position to place tooltip in, relative to anchorEl
 * @param onClick           Event fired on tooltip click
 * @param open              If true, tooltip visible
 * @param children          Tooltip content 
 * 
 * @returns Component
 */
export const Tooltip = ({ 
    anchorEl, 
    position = 'topLeft', 
    onClick, 
    open = true, 
    children 
}: PropsWithChildren<ITooltipProps>) => {
    
    // REFS
    /**
     * Store ref of tooltip element
     */
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    // STATE
    /**
     * Store tooltip position as state
     */
    const [tooltipPosition, setTooltipPosition] = useState({
        top: 0,
        left: 0
    });

    useEffect(() => {

        if(!anchorEl) {
            return
        }

        const elementPos = anchorEl.getBoundingClientRect();

        setTooltipPosition({
            top: window.scrollY + elementPos.top - (tooltipRef.current?.offsetHeight || 0) - 12,
            left: window.scrollX + elementPos.left - (tooltipRef.current?.offsetWidth || 0) - 6
        })

        const scrollListener = (e: Event) => {
            setTooltipPosition({
                top: window.scrollY + elementPos.top - (tooltipRef.current?.offsetHeight || 0) - 12,
                left: window.scrollX + elementPos.left - (tooltipRef.current?.offsetWidth || 0) - 6
            })
        }

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener)
        }

    }, [anchorEl]);

    if(!anchorEl || !open) {
        return null
    }

    return (
        <div 
            className={`${Styles.Tooltip}`}
            ref={tooltipRef}
            style={{
                position: 'fixed',
                top: `${tooltipPosition.top}px`,
                left: `${tooltipPosition.left}px`,
            }}
            onClick={onClick}
        >
            {children}
        </div>
    )

}