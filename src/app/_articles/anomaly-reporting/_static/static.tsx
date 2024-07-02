import { FaCode, FaWpforms } from "react-icons/fa";
import { IArticleIndexSection } from "../../_components/ArticleIndex/ArticleIndex.types";
import { MdMemory, MdOutlineDesignServices } from "react-icons/md";
import { TbCloud } from "react-icons/tb";

/**
 * @enum
 * 
 * @member webWorkers
 * @member memoryManagement
 * @member dataFetching
 */
export enum articleIndexHrefEnum {
    dynamicForms = 'dynamicForms',
    pdfGeneration = 'pdfGeneration',
    monorepo = 'monorepo',
    // dataFetching = 'dataFetching'
}

/**
 * Define the index of the article
 */
export const ARTICLE_INDEX: IArticleIndexSection[] = [
    {
        title: 'Monorepo Architecture',
        hrefId: articleIndexHrefEnum.monorepo,
        icon: <MdMemory fontSize={'1.5rem'} />
    },
    {
        title: 'Dynamic Forms',
        hrefId: articleIndexHrefEnum.dynamicForms,
        icon: <FaWpforms fontSize={'1.5rem'} />
    },
    {
        title: 'PDF Generation',
        hrefId: articleIndexHrefEnum.pdfGeneration,
        icon: <FaCode fontSize={'1.5rem'} />
    },
    // {
    //     title: 'Data Fetching',
    //     hrefId: articleIndexHrefEnum.dataFetching,
    //     icon: <TbCloud fontSize={'1.5rem'} />
    // }
]