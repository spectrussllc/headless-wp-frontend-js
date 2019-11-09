const siteURL = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
const wordpressURL = process.env.NODE_ENV === "production" ? "" : "https://cms.yourgfs.com";

module.exports = { siteURL, wordpressURL };
