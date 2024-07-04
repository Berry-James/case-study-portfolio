import { StaticImport } from "next/dist/shared/lib/get-img-props";

/**
 * @interface
 * 
 * @member src          Image source (string path or static import)
 * @member alt          (Optional) Alt text for image
 * @member caption      (Optional) Caption to display beneath image
 */
export interface ImgWrapperProps {
    src: string | StaticImport;
    alt?: string;
    caption?: string;
}