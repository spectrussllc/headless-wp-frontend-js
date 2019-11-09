const https = require("https");
const http = require("http");
const path = require("path");
const fs = require("fs");
const events = require("events");
const { siteURL, wordpressURL } = require("./config");

const protocol = wordpressURL.indexOf("https://") === 0 ? https : http;
const DESTINATION = process.env.DESTINATION || path.join(__dirname, ".", "static", "sitemap.xml");
const emitter = new events.EventEmitter;

protocol.get(`${wordpressURL}/wp-json/spectruss/v1/custom-post-types`, (res) => {

    let data = "";

    res.on("data", chunk => data += chunk);

    res.on("end", () => {

        const customPostTypes = JSON.parse(data);
        let typesMapped = -1;

        let xml = "";
        xml += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
        xml += "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">";

        let postsXML = [];

        protocol.get(`${wordpressURL}/wp-json/wp/v2/pages`, async (res) => {

            let data = "";

            res.on("data", chunk => data += chunk);

            res.on("end", () => {

                const pages = JSON.parse(data);

                pages.forEach((page) => {
                    let pageXML = "";
                    pageXML += "<url>";
                    pageXML += `<loc>${page.link.replace(wordpressURL, siteURL)}</loc>`;
                    pageXML += `<lastmod>${page.modified_gmt.substring(0,10)}</lastmod>`;
                    pageXML += "<changefreq>always</changefreq>";
                    pageXML += "<priority>0.5</priority>";
                    pageXML += "</url>";
                    postsXML.push(pageXML);
                });

                emitter.emit("check");

            });

        }).on("error", err => console.log("Error: " + err.message));

        customPostTypes.forEach((customPostType) => {

            protocol.get(`${wordpressURL}/wp-json/wp/v2/${customPostType}`, async (res) => {

                let data = "";

                res.on("data", chunk => data += chunk);

                res.on("end", () => {

                    const posts = JSON.parse(data);

                    posts.forEach((post) => {
                        let postXML = "";
                        postXML += "<url>";
                        postXML += `<loc>${post.link.replace(wordpressURL, siteURL)}</loc>`;
                        postXML += `<lastmod>${post.modified_gmt}</lastmod>`;
                        postXML += "<changefreq>always</changefreq>";
                        postXML += "<priority>0.5</priority>";
                        postXML += "</url>";
                        postsXML.push(postXML);
                    });

                    emitter.emit("check");

                });

            }).on("error", err => console.log("Error: " + err.message));

        });

        emitter.on("check", () => {

            typesMapped++;

            if (typesMapped === customPostTypes.length) {

                postsXML.sort();

                postsXML.forEach((postXML) => {
                    xml += postXML;
                });

                xml += "</urlset>";

                fs.writeFileSync(DESTINATION, xml);

                console.log(`Wrote sitemap for ${postsXML.length} pages to ${DESTINATION}`);

            }

        });

    });

}).on("error", err => console.log(`Error: ${err.message}`));