import { ReactNode } from "react";

/**
 * @interface
 * 
 * @member sections         Array of sections to be rendered
 */
export interface IArticleIndexProps {
    sections: IArticleIndexSection[];
}

/**
 * @interface
 * 
 * @member title            Title of the section
 * @member hrefId           ID to use as a href to jump to the section in the document
 * @member icon             (optional) Icon to be displayed next to title
 */
export interface IArticleIndexSection {
    title: string;
    hrefId: string;
    icon?: ReactNode;
}