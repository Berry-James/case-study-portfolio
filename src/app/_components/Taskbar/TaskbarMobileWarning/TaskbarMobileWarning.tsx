'use client';
import React, { useContext, useRef, useState } from 'react';
import { Tooltip } from '../../Tooltip/Tooltip';

// ICONS
import InfoIcon from '../../../_static/icons/png/msg_information-2.png';
import Image from 'next/image';
import { SystemContext } from '../../SystemContext/SystemContext';

// Key for tooltip local storage
const LOCAL_STORAGE_MOBILE_TOOLTIP_KEY = 'mobileTooltipDisabled'

export const TaskbarMobileWarning = () => {

    // CONTEXT
    const { isMobile } = useContext(SystemContext);

    // STATE
    const [tooltipOpen, setTooltipOpen] = useState(
        !Boolean(Number(typeof window === 'undefined' ? 1 : window.localStorage.getItem(LOCAL_STORAGE_MOBILE_TOOLTIP_KEY)))
    );

    // REFS
    /**
     * Anchor element for tooltip
     */
    const anchorEl = useRef<HTMLDivElement | null>(null);

    // If not viewing on mobile, return nothing
    if(!isMobile) {
        return null
    }

    // HANDLERS
    const handleCloseTooltip = () => {
        setTooltipOpen(false);
        if(typeof window !== 'undefined') {
            window.localStorage.setItem(LOCAL_STORAGE_MOBILE_TOOLTIP_KEY, '1');
        }
    }

    const handleOpenTooltip = () => {
        setTooltipOpen(true);
        if(typeof window !== 'undefined') {
            window.localStorage.setItem(LOCAL_STORAGE_MOBILE_TOOLTIP_KEY, '0')
        }
    }

    return (
        <>
        
            {/* TOOLTIP */}
            <Tooltip 
                anchorEl={anchorEl.current}
                onClick={handleCloseTooltip}
                open={tooltipOpen}
            >
                <div className='flex gap-1 items-center'>
                    <Image src={InfoIcon} height={16} width={16} alt='' />
                    <b>Attention!</b>
                </div>
                <p>View on desktop for the complete experience</p>
            </Tooltip>

            {/* ICON */}
            <div 
                ref={anchorEl}
                onClick={handleOpenTooltip}
            >
                <Image src={InfoIcon} height={16} width={16} alt='' />
            </div>
        </>
       
    )

}