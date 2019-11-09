import { CSSProperties, ReactElement } from "react";
import getSpreadedProps from "../helpers/getSpreadedProps";
import Img from "../interfaces/Image";
import LazyLoad from "react-lazyload";

export default ({ img, noLazy, style, id, className, onClick, onMouseEnter, onMouseLeave }: {
    img: Img;
    noLazy?: boolean;
    style?: CSSProperties;
    id?: string;
    className?: string;
    onClick?: Function;
    onMouseEnter?: Function;
    onMouseLeave?: Function;
}): ReactElement => {
    let attrs: {
        alt: string;
        src: string;
        style?: CSSProperties;
        id?: string;
        className?: string;
        onClick?: Function;
        onMouseEnter?: Function;
        onMouseLeave?: Function;
        srcSet: string;
        sizes: string;
    } = {
        src: img.url,
        alt: img.alt,
        srcSet: "",
        sizes: "",
        style,
        id,
        className,
        onClick,
        onMouseEnter,
        onMouseLeave
    };
    if (img.sizes) {
        attrs.srcSet = `${img.url} ${img.width}w`;
        attrs.sizes = `${img.width}px`;
        Object.keys(img.sizes).forEach((key) => {
            if (key.indexOf("-") === -1 && attrs.srcSet.indexOf(img.sizes[key]) === -1) {
                attrs.srcSet += `, ${img.sizes[key]} `;
            } else if (key.indexOf("width") >= 0 && attrs.sizes.indexOf(img.sizes[key]) === -1) {
                attrs.srcSet += `${img.sizes[key]}w`;
                attrs.sizes += `, (max-width: ${img.sizes[key]}px) ${img.sizes[key]}px`;
            }
        });
    }
    return noLazy ? <img {...getSpreadedProps(attrs)} /> : <LazyLoad><img {...getSpreadedProps(attrs)} /></LazyLoad>;
}