import { useState, CSSProperties, ReactElement } from "react";
import Img from "../interfaces/Image";
import WpImg from "./WpImg";

export default ({ img1, img2, noLazy, style, id, className, onClick }: {
    img1: Img;
    img2: Img;
    noLazy?: boolean;
    style?: CSSProperties;
    id?: string;
    className?: string;
    onClick?: Function;
}): ReactElement => {
    const [activeImg, setActiveImg] = useState(img1);
    return (
        <WpImg
            noLazy={noLazy}
            style={style}
            id={id}
            className={className}
            img={activeImg}
            onClick={onClick}
            onMouseEnter={(): void => { setActiveImg(img2); }}
            onMouseLeave={(): void => { setActiveImg(img1); }}
        />
    );
}