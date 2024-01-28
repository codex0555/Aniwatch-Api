const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const src = express();

const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";
const ACCEPT_ENCODING_HEADER = "gzip, deflate, br";

src.get('/server-src/:id', async ( req, res )=>{
    const serversrc = req.params.id.match(/\d+/);
    const serversrclink = `https://aniwatchtv.to/ajax/v2/episode/sources?id=${serversrc}`;

    try {
        const serversrcani = await axios.get(serversrclink, {
            headers:{
                'User-Agent': USER_AGENT,
                "Accept-Encoding": ACCEPT_ENCODING_HEADER,
            }
        });
        const serversrcwatch = serversrcani.data;

        //const $ = cheerio.load(serversrcwatch);

        const serverSrc = [];

        const serverlinkAni = serversrcwatch.link;
        const linktype = serversrcwatch.type;

        serverSrc.push({ serverlinkAni, linktype});

        res.json({ serverSrc});
    } catch (error) {
        console.log('error .......', error);
    }
})

module.exports = src ;