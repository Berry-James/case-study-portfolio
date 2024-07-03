import React from 'react';
import { IBadgeProps } from './Badge.types';
import Styles from './Badge.module.css';

export const Badge = ({ children, badgeContent }: IBadgeProps) => {

    return (
        <div className='relative'>
            <div className={`${Styles.Badge} ${Styles.BadgeTopRight}`}>
                {badgeContent}
            </div>
            {children}
        </div>
    )

}