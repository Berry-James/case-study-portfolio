import { FaCode } from "react-icons/fa";
import { IArticleIndexSection } from "../../_components/ArticleIndex/ArticleIndex.types";
import { MdMemory, MdOutlineDesignServices } from "react-icons/md";

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
}

/**
 * Define the index of the article
 */
export const ARTICLE_INDEX: IArticleIndexSection[] = [
    {
        title: 'UX/UI',
        hrefId: articleIndexHrefEnum.uxUi,
        icon: <MdOutlineDesignServices fontSize={'1.5rem'} />
    },
    {
        title: 'Web Workers',
        hrefId: articleIndexHrefEnum.webWorkers,
        icon: <FaCode fontSize={'1.5rem'} />
    },
    {
        title: 'Memory Management',
        hrefId: articleIndexHrefEnum.memoryManagement,
        icon: <MdMemory fontSize={'1.5rem'} />
    }
]