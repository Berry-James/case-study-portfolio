import React from 'react';
import { IArticleParagraphProps } from './ArticleParagraph.types';

/**
 * Custom paragraph wrapper for articles
 * @implements {IArticleParagraphProps}
 * 
 * @param props.body            Text body for article
 * @param props.title           (Optional) Title to display above body
 * 
 * @returns Component
 */
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