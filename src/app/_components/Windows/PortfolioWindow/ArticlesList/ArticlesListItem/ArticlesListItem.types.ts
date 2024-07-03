import { ReactNode } from "react";
import { IArticleListItem } from "../ArticlesList.types";
import { IDocument } from "@/app/_components/SystemContext/_static/documents/documents.types";

/**
 * @interface
 * 
 * @member title
 * @member icon
 * @member subtitle
 */
export type IArticlesListItemProps = IDocument & { index: number };