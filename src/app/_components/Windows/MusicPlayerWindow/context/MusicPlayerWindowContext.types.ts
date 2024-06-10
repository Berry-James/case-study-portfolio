/**
 * @interface
 * 
 * @member playingTrackId               ID of the currently playing track
 * @member handleSetPlayingTrackId      Updates the currently playing track ID to a given value
 */
export interface IMusicPlayerWindowContext {
    playingTrackId: string | null;
    handleSetPlayingTrackId: (newPlayingTrackId: string) => void;
}