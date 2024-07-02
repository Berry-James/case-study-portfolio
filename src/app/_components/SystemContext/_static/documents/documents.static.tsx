import { IDocument, documentIdEnum } from './documents.types';
import Image from "next/image";

// ARTICLES
import AnomalyReportingArticle from '../../../../_articles/anomaly-reporting/page.mdx';
import SportsScienceArticle from '../../../../_articles/sports-science/page.mdx';
import VehicleMonitoringArticle from '../../../../_articles/vehicle-monitoring/page.mdx';

// ICONS
import AnomalyReportingIcon from '../../../../_static/icons/png/write_wordpad-1.png';
import VehicleMonitoringIcon from '../../../../_static/icons/png/channels-2.png';
import SportsScienceIcon from '../../../../_static/icons/png/stopwatch.png';

/**
 * Static Dictionary map of system documents
 */
export const DOCUMENTS_DICT: Record<documentIdEnum, IDocument> = {
    [documentIdEnum.anomalyReporting]: {
        id: documentIdEnum.anomalyReporting,
        title: 'Anomaly Reporting',
        component: <AnomalyReportingArticle />,
        icon: <Image src={AnomalyReportingIcon} height={32} width={32} alt="" />
    },
    [documentIdEnum.sportsScience]: {
        id: documentIdEnum.sportsScience,
        title: 'Sports Science',
        component: <SportsScienceArticle />,
        icon: <Image src={SportsScienceIcon} height={32} width={32} alt="" />
    },
    [documentIdEnum.vehicleMonitoring]: {
        id: documentIdEnum.vehicleMonitoring,
        title: 'Vehicle Monitoring',
        component: <VehicleMonitoringArticle />,
        icon: <Image src={VehicleMonitoringIcon} height={32} width={32} alt="" />
    },
}