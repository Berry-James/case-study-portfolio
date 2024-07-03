import { FaCode, FaRunning, FaWpforms } from "react-icons/fa";
import { IArticleListItem } from "../_components/Windows/PortfolioWindow/ArticlesList/ArticlesList.types";
import { IconBaseProps } from "react-icons";
import { MdMemory, MdOutlineDesignServices } from "react-icons/md";
import { TbCloud, TbPuzzle } from "react-icons/tb";
import { BiTimer } from "react-icons/bi";
import { LuClipboardEdit, LuPaintbrush } from "react-icons/lu";
import { FiTruck } from "react-icons/fi";
import { RiDragDropLine } from "react-icons/ri";

/**
 * Base props for icon components
 */
const PROPS: IconBaseProps = {
    fontSize: '1.5rem',
}

/**
 * Static array of all case study articles
 */
export const ARTICLES: IArticleListItem[] = [
    {
        title: 'Sports Science',
        icon: <FaRunning {...PROPS} />,
        skills: [
            {
                title: 'UX/UI',
                icon: <MdOutlineDesignServices />
            },
            {
                title: 'Web Workers',
                icon: <FaCode />
            },
            {
                title: 'Memory Management',
                icon: <MdMemory />
            },
            {
                title: 'Data Fetching',
                icon: <TbCloud />
            }
        ]
    },
    {
        title: 'Anomaly Reporting',
        icon: <LuClipboardEdit {...PROPS}/>,
        skills: [
            {
                title: 'Dynamic Forms',
                icon: <FaWpforms />
            },
            {
                title: 'Real Time Data',
                icon: <BiTimer />
            },
            {
                title: 'Redraw Optimisation',
                icon: <LuPaintbrush />
            }
        ]
    },
    {
        title: 'Vehicle Monitoring',
        icon: <FiTruck {...PROPS} />,
        skills: [
            {
                title: 'Drag and Drop',
                icon: <RiDragDropLine />
            },
            {
                title: 'Real Time Data',
                icon: <BiTimer />
            },
            {
                title: 'Interactive Builder',
                icon: <TbPuzzle />
            }
        ]
    }
]