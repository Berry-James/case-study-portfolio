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

export function isValidVolume(volume: number) {
    return volume >= 0 && volume <= 1
}