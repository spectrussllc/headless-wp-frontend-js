import { ReactElement } from "react";
import { siteURL, wordpressURL } from "../config";
import PageProps from "../interfaces/PageProps";
import Head from "next/head";

export default ({ page }: PageProps): ReactElement => {
    page.meta.title = page.meta.title || (page.post_title === "Home" ? page.meta.site_name : `${page.post_title} - ${page.meta.site_name}`);
    page.meta.canonical = `${siteURL}/${page.post_name}`;
    const { meta } = page;
    const { canonical, description, favicon, title, og_site_name, og_title, og_description, og_image, twitter_title, twitter_description, twitter_image } = meta;
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="canonical" href={canonical} />
            <link rel="dns-prefetch" href={wordpressURL} />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={og_site_name} />
            <meta property="og:title" content={og_title || title} />
            <meta property="og:description" content={og_description || description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={og_image} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={twitter_title || title} />
            <meta name="twitter:description" content={twitter_description || description} />
            <meta name="twitter:image" content={twitter_image} />
            <link rel="shortcut icon" href={favicon} />
        </Head>
    );
}