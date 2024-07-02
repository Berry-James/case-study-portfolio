'use client';
import React, { useContext, useMemo } from 'react';
import { DocumentWindowContext, DocumentWindowContextProvider } from './context/DocumentWindowContext';
import { DOCUMENTS_DICT } from '../../SystemContext/_static/documents/documents.static';
import { IDocumentWindowProps } from './DocumentWindow.types';
import { documentIdEnum } from '../../SystemContext/_static/documents/documents.types';

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
    const { activeDocumentId, handleSetActiveDocumentId } = useContext(DocumentWindowContext);

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
        <div className='p-2 md:mx-6'>

            {/* DOCUMENT SELECT */}
            <div className='flex flex-col mb-2'>
                <select
                    // TODO -> fix this type casting
                    onChange={(e) => handleSetActiveDocumentId(e.target.value as unknown as documentIdEnum)}
                    className='px-1'
                    value={activeDocumentId || -1}
                >
                    {
                        Object.entries(DOCUMENTS_DICT).map(([key, value]) => (
                            <option 
                                value={value.id} 
                                key={value.id}
                            >
                                {value.title}
                            </option>
                        ))
                    }
                </select>
            </div>

            {/* ACTIVE DOCUMENT */}
            {
                activeDocument?.component &&
                <div 
                    className='bg-white px-2 md:px-8 py-4'
                    style={{
                        fontFamily: 'var(--font-document)'
                    }}
                >
                    { activeDocument?.component }
                </div>
            }
        </div>
    )

}