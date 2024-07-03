import { FaWpforms } from "react-icons/fa";
import { IArticleIndexSection } from "../../_components/ArticleIndex/ArticleIndex.types";
import { TbCloud } from "react-icons/tb";
import { BiTimer } from "react-icons/bi";

/**
 * @enum
 * 
 * @member webWorkers
 * @member memoryManagement
 * @member dataFetching
 */
export enum articleIndexHrefEnum {
    dataFetching = 'dataFetching',
    dynamicForms = 'dynamicForms',
    realTimeData = 'realTimeData',
}

/**
 * Define the index of the article
 */
export const ARTICLE_INDEX: IArticleIndexSection[] = [
    {
        title: 'Data Fetching',
        hrefId: articleIndexHrefEnum.dataFetching,
        icon: <TbCloud fontSize={'1.5rem'} />
    },
    {
        title: 'Dynamic Forms',
        hrefId: articleIndexHrefEnum.dynamicForms,
        icon: <FaWpforms fontSize={'1.5rem'} />
    },
    {
        title: 'Real Time Data',
        hrefId: articleIndexHrefEnum.realTimeData,
        icon: <BiTimer fontSize={'1.5rem'} />
    }
]