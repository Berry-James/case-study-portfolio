import React from 'react';
import { IDialogWindowProps } from './DialogWindow.types';

export const DialogWindow = (props: IDialogWindowProps) => {

    return (
        <div>
            {props.children}
        </div>
    )

}