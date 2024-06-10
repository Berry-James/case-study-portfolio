
import { VscSparkle } from "react-icons/vsc";
import { IDocument, documentIdEnum } from './documents.types';

// ARTICLES
import AnomalyReportingArticle from '../../../../_articles/anomaly-reporting/page.mdx';
import SportsScienceArticle from '../../../../_articles/sports-science/page.mdx';
import VehicleMonitoringArticle from '../../../../_articles/vehicle-monitoring/page.mdx';

/**
 * Static Dictionary map of system documents
 */
export const DOCUMENTS_DICT: Record<documentIdEnum, IDocument> = {
    [documentIdEnum.anomalyReporting]: {
        id: documentIdEnum.anomalyReporting,
        title: 'Anomaly Reporting',
        component: <AnomalyReportingArticle />,
        icon: <VscSparkle />
    },
    [documentIdEnum.sportsScience]: {
        id: documentIdEnum.sportsScience,
        title: 'Sports Science',
        component: <SportsScienceArticle />,
        icon: <VscSparkle />
    },
    [documentIdEnum.vehicleMonitoring]: {
        id: documentIdEnum.vehicleMonitoring,
        title: 'Vehicle Monitoring',
        component: <VehicleMonitoringArticle />,
        icon: <VscSparkle />
    },
}