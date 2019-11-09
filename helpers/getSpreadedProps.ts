import { HTMLAttributes } from "react";
import StringKeyedObject from "../interfaces/StringKeyedObject";

const propsKeysLink: {
    textToDisplay: string;
    [key: string]: string;
} = { textToDisplay: "" };

export default (props: StringKeyedObject): HTMLAttributes<HTMLElement> => {
    let htmlProps: StringKeyedObject = {} as HTMLAttributes<HTMLElement>;
    for (let key in props) {
        if (!(propsKeysLink)[key]) {
            htmlProps[key] = props[key];
        }
    }
    return htmlProps;
}