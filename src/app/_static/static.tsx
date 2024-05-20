import { FaCode, FaGlobeAsia, FaRunning, FaTruck, FaWpforms } from "react-icons/fa";
import { IArticleListItem } from "../_components/ArticlesList/ArticlesList.types";
import { IconBaseProps, IconType } from "react-icons";
import { PAGE_ROUTES } from "@/network/pageRoutes";
import { MdMemory, MdOutlineDesignServices } from "react-icons/md";
import { TbCloud } from "react-icons/tb";
import { BiTimer } from "react-icons/bi";
import { LuClipboardEdit, LuPaintbrush } from "react-icons/lu";
import { FiTruck } from "react-icons/fi";

const PROPS: IconBaseProps = {
    fontSize: '1.5rem',
}

export const ARTICLES: IArticleListItem[] = [
    {
        title: 'Sports Science',
        icon: <FaRunning {...PROPS} />,
        href: PAGE_ROUTES.articles.sportsScience,
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
        href: PAGE_ROUTES.articles.anomalyReporting,
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
        href: PAGE_ROUTES.articles.vehicleMonitoring,
        skills: []
    }
]