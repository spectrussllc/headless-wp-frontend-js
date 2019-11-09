export default interface Image {
    alt: string;
    sizes: {
        [key: string]: string;
    }
    url: string;
    width: string;
}