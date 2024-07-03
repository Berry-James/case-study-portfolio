import { documentIdEnum } from "../../SystemContext/_static/documents/documents.types";
import { IWindowComponentProps } from "../../SystemContext/_static/windows/windows.types";

/**
 * Extends IWindowComponentProps, with added documentId
 */
export type IDocumentWindowProps = IWindowComponentProps<{ documentId?: documentIdEnum }>;