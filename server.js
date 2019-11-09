const https = require("https");
const http = require("http");
const express = require("express");
const next = require("next");
const secure = require("ssl-express-www");
const { wordpressURL } = require("./config");

const protocol = wordpressURL.indexOf("https://") === 0 ? https : http;
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const { join } = require("path");

protocol.get(`${wordpressURL}/wp-json/spectruss/v1/custom-post-types`, (res) => {

    let data = "";

    res.on("data", chunk => data += chunk);

    res.on("end", () => {

        const customPostTypes = JSON.parse(data);

        app.prepare().then(() => {

            const server = express();

            if (!dev) server.use(secure);

            const rootStaticFiles = ["sitemap.xml", "robots.txt"];

            // static files
            rootStaticFiles.forEach((file) => {
                server.get(`/${file}`, (req, res) => {
                    app.serveStatic(req, res, join(__dirname, "static", file));
                });
            });

            // post types
            customPostTypes.forEach((customPostType) => {
                server.get(`/${customPostType}/:slug`, (req, res) => {
                    app.render(req, res, `/cpts/${customPostType}`, { slug: req.params.slug, type: customPostType });
                });
            });

            // cpts dir
            server.get("/cpts/*", (req, res) => {
                app.render404(req, res);
            });

            // else
            server.get("*", (req, res) => {
                return handle(req, res);
            });

            server.listen(port, (err) => {
                if (err) console.error(err);
                console.log(`Ready on port ${port}`);
            });

        }).catch((ex) => {
            console.error(ex.stack);
            process.exit(1);
        });

    });

}).on("error", err => console.log("Error: " + err.message));