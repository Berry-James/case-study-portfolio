import { IArticleIndexSection } from "../ArticleIndex.types";

/**
 * @interface
 * 
 * @member section          A single section to be displayed as a button
 * @member index            Index of given section
 */
export interface IArticleIndexSectionProps {
    section: IArticleIndexSection;
    index: number;
}