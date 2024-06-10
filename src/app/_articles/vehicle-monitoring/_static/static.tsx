import { FaCode, FaWpforms } from "react-icons/fa";
import { IArticleIndexSection } from "../../_components/ArticleIndex/ArticleIndex.types";
import { MdMemory, MdOutlineDesignServices } from "react-icons/md";
import { TbCloud } from "react-icons/tb";
import { BiTimer } from "react-icons/bi";
import { LuPaintbrush } from "react-icons/lu";

/**
 * @enum
 * 
 * @member webWorkers
 * @member memoryManagement
 * @member dataFetching
 */
export enum articleIndexHrefEnum {
    uxUi = 'uxUi',
    webWorkers = 'webWorkers',
    memoryManagement = 'memoryManagement',
    dataFetching = 'dataFetching'
}

/**
 * Define the index of the article
 */
export const ARTICLE_INDEX: IArticleIndexSection[] = [
    {
        title: 'Dynamic Forms',
        hrefId: articleIndexHrefEnum.uxUi,
        icon: <FaWpforms fontSize={'1.5rem'} />
    },
    {
        title: 'Real Time Data',
        hrefId: articleIndexHrefEnum.webWorkers,
        icon: <BiTimer fontSize={'1.5rem'} />
    },
    {
        title: 'Redraw Optimisation',
        hrefId: articleIndexHrefEnum.memoryManagement,
        icon: <LuPaintbrush fontSize={'1.5rem'} />
    },
    {
        title: 'Data Fetching',
        hrefId: articleIndexHrefEnum.dataFetching,
        icon: <TbCloud fontSize={'1.5rem'} />
    }
]