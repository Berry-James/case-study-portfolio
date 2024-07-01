import { documentIdEnum } from '@/app/_components/SystemContext/_static/documents/documents.types';
import { DocumentWindow } from '@/app/_components/Windows/DocumentWindow/DocumentWindow';
import { PAGE_ROUTES } from '@/network/pageRoutes';
import Link from 'next/link';
import React from 'react';

/**
 * Page for viewing a single article
 * 
 * @param props.params.articleId            ID/name of article to view (documentIdEnum)
 * @returns Page
 */
const ArticleIdPage = ({ params }: { params: { articleId: documentIdEnum } } ) => {

    return (
        <div>
            <div className='p-2'>
                <Link href={PAGE_ROUTES.mobile}>
                    <button className='text-button'>
                        Back
                    </button>
                </Link>
            </div>
          

            <DocumentWindow 
                instanceId={''}   
                documentId={params.articleId} 
            />
        </div>
    
    )

}

export default ArticleIdPage