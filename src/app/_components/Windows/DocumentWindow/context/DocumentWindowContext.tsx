import { documentIdEnum } from '@/app/_components/SystemContext/_static/documents/documents.types';
import React, { createContext, useState } from 'react';
import { IDocumentWindowContext, IDocumentWindowContextProviderProps } from './DocumentWindowContext.types';

/**
 * Functional context for the document window/application
 * @implements {IDocumentWindowContext}
 * 
 * @returns Context
 */
export const DocumentWindowContext = createContext<IDocumentWindowContext>({
    activeDocumentId: null,
    handleSetActiveDocumentId: (newActiveDocumentId: documentIdEnum | null) => undefined
});

/**
 * Provider for @see {DocumentWindowContext}
 * 
 * @param props.children            Child components
 * @param props.defaultDocumentId   (optional) ID of a document to open on component mount
 * 
 * @returns Component
 */
export const DocumentWindowContextProvider = ({ children, defaultDocumentId }: IDocumentWindowContextProviderProps) => {

    // STATE
    /**
     * ID of the currenly active/viewed document
     */
    const [activeDocumentId, setActiveDocumentId] = useState<documentIdEnum | null>(defaultDocumentId !== undefined ? defaultDocumentId : null);
    
    // HANDLERS
    /**
     * Sets the activeDocumentId to the given value
     * 
     * @param newActiveDocumentId           New ID to be set
     * @returns void
     */
    const handleSetActiveDocumentId = (newActiveDocumentId: documentIdEnum | null) => setActiveDocumentId(newActiveDocumentId); 

    return (
        <DocumentWindowContext.Provider
            value={{
                activeDocumentId,
                handleSetActiveDocumentId
            }}
        >
            { children }
        </DocumentWindowContext.Provider>
    )

}