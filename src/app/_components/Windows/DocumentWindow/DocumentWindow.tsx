'use client';
import React, { useContext, useMemo } from 'react';
import { DocumentWindowContext, DocumentWindowContextProvider } from './context/DocumentWindowContext';
import { DOCUMENTS_DICT } from '../../SystemContext/_static/documents/documents.static';
import { IDocumentWindowProps } from './DocumentWindow.types';

/**
 * Document window/application.  Currently used to display ANY component inside (but for articles mostly)
 * 
 * @param props.documentId              ID of the document to be viewed
 * @param props.instanceId              instanceId of the greater window this DocumentWindow is a part of
 * 
 * @returns Component
 */
export const DocumentWindow = ({ documentId, instanceId }: IDocumentWindowProps) => {

    return (
        <DocumentWindowContextProvider defaultDocumentId={documentId}>
            <DocumentWindowContent />
        </DocumentWindowContextProvider>
    )

}

/**
 * Content for @see {DocumentWindow}
 * 
 * @returns Component
 */
const DocumentWindowContent = () => {

    // CONTEXT
    const { activeDocumentId } = useContext(DocumentWindowContext);

    // COMPUTED
    /**
     * Determines the activeDocument based on the activeDocumentId in context
     */
    const activeDocument = useMemo(() => {

        if(
            activeDocumentId !== undefined && 
            activeDocumentId !== null &&
            DOCUMENTS_DICT[activeDocumentId]
        ) {
            return DOCUMENTS_DICT[activeDocumentId]
        }

        return null

    }, [activeDocumentId]);

    return (
        <div className='p-2 mx-12'>
            <div 
                className='bg-white px-8 py-12'
                style={{
                    fontFamily: 'var(--font-document)'
                }}
            >
                { activeDocument?.component }
            </div>
        </div>
    )

}