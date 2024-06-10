import { documentIdEnum } from "@/app/_components/SystemContext/_static/documents/documents.types";
import { PropsWithChildren } from "react";

/**
 * @interface
 * 
 * @member activeDocumentId             ID of the active document in the documentIdEnum
 * @member handleSetActiveDocumentId    Sets the activeDocumentId state to the given value
 */
export interface IDocumentWindowContext {
    activeDocumentId: documentIdEnum | null;
    handleSetActiveDocumentId: (newActiveDocumentId: documentIdEnum | null) => void;
}

/**
 * @interface
 * @extends PropsWithChildren
 * 
 * @member defaultDocumentId            (optional) ID of a document to open on component mount
 */
export interface IDocumentWindowContextProviderProps extends PropsWithChildren {
    defaultDocumentId?: documentIdEnum
}