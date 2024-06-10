import { ReactNode } from "react";

/**
 * @enum
 * 
 * @member anomalyReporting
 * @member sportsScience
 * @member vehicleMonitoring
 */
export enum documentIdEnum {
    anomalyReporting,
    sportsScience,
    vehicleMonitoring
}

/**
 * @interface
 * 
 * @member id               Id of the document in the documentIdEnum
 * @member title            String title of the document
 * @member component        The component which maps to this document
 * @member icon             Custom icon for the document
 */
export interface IDocument {
    id: documentIdEnum;
    title: string;
    component: ReactNode;
    icon: ReactNode;
}