import { useEffect, useState } from "react"

// Default timeout of 3 seconds
const DEFAULT_TIMEOUT = 3000

/**
 * WIP loading simulator for documents
 * @alpha
 * 
 * @param param0 
 * @returns 
 */
export const useFakeLoading = ({
    timeout,
    initialLoading
}: {
    timeout?: number,
    initialLoading?: boolean
}) => {

    // STATE
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const t = setTimeout(() => {

            setIsLoading(false);

        }, timeout !== undefined ? timeout : DEFAULT_TIMEOUT);

        return () => clearTimeout(t);

    }, []);

    return {
        isLoading
    }



}