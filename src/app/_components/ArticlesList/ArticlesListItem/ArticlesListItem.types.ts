import { ReactNode } from "react";
import { IArticleListItem } from "../ArticlesList.types";

/**
 * @interface
 * 
 * @member title
 * @member icon
 * @member subtitle
 */
export type IArticlesListItemProps = IArticleListItem & { index: number };