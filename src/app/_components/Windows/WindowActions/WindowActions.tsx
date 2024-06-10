import React from 'react';
import { IWindowActionsProps } from './WindowActions.types';

/**
 * Actions/buttons bar displayed at the bottom of a WindowWrapper (if any actions are given)
 * 
 * @param props.actions             Object containing any given actions
 * @returns Component
 */
export const WindowActions = ({ actions }: IWindowActionsProps) => {

    /**
     * If no actions supplied, return null
     */
    if(!actions || !actions.onApply && !actions.onCancel && !actions.onOkay && !actions.custom) {
        return null;
    }

    return (
        <div className='absolute bottom-0 left-0 p-2 w-full flex gap-2 items-center justify-end pr-12 overflow-hidden'>
            
            {/* CUSTOM ACTIONS (NODES) */}
            { actions.custom }

            {/* OKAY ACTION */}
            {
                actions.onOkay && <button className='text-button' onClick={actions.onOkay}>Ok</button>
            }

            {/* APPLY ACTION */}
            {
                actions.onApply && <button className='text-button' onClick={actions.onApply}>Apply</button>
            }

            {/* CANCEL ACTION */}
            {
                actions.onCancel && <button className='text-button' onClick={actions.onCancel}>Cancel</button>
            }
        </div>
    )

}