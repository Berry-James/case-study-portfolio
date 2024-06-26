/**
 * @interface
 * 
 * @member notepadRef
 * @member downloadAsTextFile
 */
export interface INotepadWindowContext {
    notepadRef: React.MutableRefObject<HTMLTextAreaElement | null>;
    downloadAsTextFile: () => void;
}