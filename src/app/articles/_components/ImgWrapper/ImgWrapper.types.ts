import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface ImgWrapperProps {
    src: string | StaticImport;
    alt?: string;
    caption?: string;
}