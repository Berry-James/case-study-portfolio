import { ReactNode } from "react";

export interface IArticlesListProps {
    articles: IArticleListItem[];
}

export interface IArticleListItem {
    title: string;
    icon: ReactNode;
    skills: IArticleListItemSkill[];
    subtitle?: string;    
}

export interface IArticleListItemSkill {
    title: string;
    icon: ReactNode;
}