import React from 'react';
import { IArticleParagraphProps } from './ArticleParagraph.types';

export const ArticleParagraph = ({ body, title }: IArticleParagraphProps) => {

    return (
        <section>

            {/* TITLE */}
            {
                title && <h6>{ title }</h6>
            }

            {/* BODY */}
            <p>
                { body }
            </p>
        </section>
    )

}