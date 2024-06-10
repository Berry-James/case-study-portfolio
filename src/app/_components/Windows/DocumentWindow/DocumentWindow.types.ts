import { documentIdEnum } from "../../SystemContext/_static/documents/documents.types";
import { IWindowComponentProps } from "../../SystemContext/_static/windows/windows.types";

export type IDocumentWindowProps = IWindowComponentProps<{ documentId?: documentIdEnum }>;