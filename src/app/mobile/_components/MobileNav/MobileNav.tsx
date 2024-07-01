import React from 'react';
import Styles from './MobileNav.module.css';

// ICONS
import PortfolioIcon from '../../../_static/icons/png/desktop_w95-0.png';
import Image from 'next/image';

/**
 * Simple mobile 'nav' component
 * Contains static text and icon
 * 
 * @returns Component
 */
export const MobileNav = () => {

    return (
        <nav className={`${Styles.MobileNav}`}>
            <Image src={PortfolioIcon} width={16} height={16} alt='' priority />
            <span>
                James Berry | Portfolio
            </span>
        </nav>
    )

}