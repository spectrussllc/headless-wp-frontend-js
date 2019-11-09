const withTypeScript = require('@zeit/next-typescript')
const withCSS = require("@zeit/next-css");
const withSASS = require("@zeit/next-sass");

module.exports = withTypeScript(withCSS(withSASS({
    exportPathMap: (() => {
        return {
            "/": {
                page: "/",
            },
        };
    }),
    distDir: "build",
})));