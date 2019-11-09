import fetch from "isomorphic-fetch";
import { wordpressURL } from "../config";
import Post from "../interfaces/Post";

const apiURL: string = `${wordpressURL}/wp-json`;

const getPage: Function = async (pathname: string): Promise<Post> => (pathname === "/") ? await (await fetch(`${apiURL}/spectruss/v1/home-page`)).json() : await (await fetch(`${apiURL}/spectruss/v1/pages/${pathname.substring(1)}`)).json();

const getPost: Function = async (slug: string, type: string): Promise<Post> => await (await fetch(`${apiURL}/spectruss/v1/${type}/${slug}`)).json();

const submitContactForm7: Function = async (id: number, form: HTMLFormElement): Promise<{
    into: string;
    invalidFields?: Array<{
        idref: null;
        into: string;
        message: string;
    }>;
    message: string;
    status: string;
}> => (
    await (await fetch(`${apiURL}/contact-form-7/v1/contact-forms/${id}/feedback`, {
        method: "POST",
        body: new FormData(form)
    })).json()
);

export { getPage, getPost, submitContactForm7 };