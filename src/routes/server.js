const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const server = express();

const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";
const ACCEPT_ENCODING_HEADER = "gzip, deflate, br";

server.get('/server/:id', async ( req, res )=>{
    const serverour = req.params.id.match(/\d+/);
    const serverlink = `https://aniwatchtv.to/ajax/v2/episode/servers?episodeId=${serverour}`;

    try {
        const serverdefine = await axios.get(serverlink, {
            headers:{
                'User-Agent': USER_AGENT,
                "Accept-Encoding": ACCEPT_ENCODING_HEADER,
            }
        })
        const serverani = serverdefine?.data?.html;

        const $ = cheerio.load(serverani);

        const sub = [];

        const dub = [];

        $('.ps_-block.ps_-block-sub.servers-sub .ps__-list .server-item').each(function( index, element){
            const server = $(element).find('a').text().toLowerCase().trim();
            const id = $(element)?.attr('data-server-id')?.trim();
            const srcId = $(element)?.attr('data-id')?.trim();

            sub.push({ server, id, srcId});
        })

        $('.ps_-block.ps_-block-sub.servers-dub .ps__-list .server-item').each(function( index, element){
            const server = $(element).find('a').text().toLowerCase().trim();
            const id = $(element)?.attr('data-server-id')?.trim();
            const srcId = $(element)?.attr('data-id')?.trim();

            dub.push({ server, id, srcId});
        })


        

        res.json({ sub, dub});
    } catch (error) {
        console.log('errorrrrr');
    }
})

module.exports = server;

