import StringKeyedObject from "./StringKeyedObject";

export default interface Post {
    ID: number;
    comment_count: string;
    comment_status: string;
    fields: StringKeyedObject;
    filter: string;
    footer_options: StringKeyedObject;
    guid: string;
    header_options: StringKeyedObject;
    menu_order: number;
    meta: {
        canonical: string;
        favicon: string;
        site_name: string;
        title: string;
        description: string;
        og_site_name: string;
        og_title: string;
        og_description: string;
        og_image: string;
        twitter_title: string;
        twitter_description: string;
        twitter_image: string;
    }
    ping_status: string;
    pinged: string;
    post_author: string;
    post_content: string;
    post_content_filtered: string;
    post_date: string;
    post_date_gmt: string;
    post_excerpt: string
    post_mime_type: string
    post_modified: string;
    post_modified_gmt: string;
    post_name: string;
    post_parent: number;
    post_password: string
    post_status: string;
    post_title: string;
    post_type: string;
    to_ping: string;
    [key: string]: any;
}