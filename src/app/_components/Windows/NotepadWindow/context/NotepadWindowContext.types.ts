/**
 * @interface
 * 
 * @member notepadRef                   Ref for the textarea used
 * @member downloadAsTextFile           Downloads the contents of notepadRef as .txt file
 */
export interface INotepadWindowContext {
    notepadRef: React.MutableRefObject<HTMLTextAreaElement | null>;
    downloadAsTextFile: () => void;
}