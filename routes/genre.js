const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const genre = express();
//const port = 3000;

const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";

genre.get('/genre/:id', async ( req, res)=>{
    const genreneed = req.params.id;
    const genrelink = `https://aniwatchtv.to/genre/${genreneed}`;

    try {
        const genreone = await axios.get(genrelink, {
            headers:{
                'User-Agent': USER_AGENT,
            }
        });
        const receivegenre = genreone.data;

        const $ = cheerio.load(receivegenre);

        const genreX = [];

       const genrey = $('.block_area_category').find('.cat-heading').text();

        $('.flw-item').each((index, element)=>{
            const name = $(element).find('.dynamic-name').text();
            const jname = $(element).find('.dynamic-name').attr('data-jname');
            const format = $(element).find('.fdi-item:first').text();
            const duration = $(element).find('.fdi-item:eq(1)').text();
            const sub = $(element).find('.tick-sub').text();
            const dubXanime = $(element).find('.tick-dub').text() || false;
            const totalepX = $(element).find('.tick-eps').text() || false;
            const descX = $(element).find('.description').text().trim() || false;
            const imageX = $(element).find('.film-poster img').attr('data-src');
            idX = $(element).find('.film-poster a').attr('href').split('/')[1];


            genreX.push({ name, jname, format, duration, sub, dubXanime, totalepX, descX, imageX, idX});
        });

        res.json({ genrey : genrey, genreX});
    } catch (error) {
        console.log('In Error.')
        res.send('Check Your Demand //frozen');
    }
})


module.exports = genre;
