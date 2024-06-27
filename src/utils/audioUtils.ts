/**
 * Formats a given volume into the correct format (a number, that cannot be greater than 1 less than 0)
 * 
 * @param volume        The input volume
 * 
 * @returns             Formatted volume
 * @throws              If volume is invalid
 */
export function formatVolume(volume: string | number | null | undefined) {

    switch(typeof volume) {
        case "string": {
            const parsed = parseFloat(volume);

            if(isValidVolume(parsed)) {
                return parsed
            }
            throw new Error(`String volume is invalid.  Received ${volume} and parsed to ${parsed} (Volume must be between 0 and 1)`);
        }
        case "number": {
            if(!isValidVolume) {
                throw new Error(`Number volume is invalid.  Received ${volume} (Volume must be between 0 and 1)`)
            }
            return volume;
        }
        case "undefined": {
            throw new Error('Volume cannot be undefined')
        }
    }

}

/**
 * Determines if volume as number is valid
 * 
 * @param volume        Volume as number
 * @returns             If the volume is valid
 */
export function isValidVolume(volume: number) {
    return volume >= 0 && volume <= 1
}