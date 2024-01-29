const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const genre = express();
//const port = 3000;
const cors = require('cors');

const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";

genre.use(cors());

genre.get('/genre/:id/:page?', async ( req, res)=>{
    const genreneed = req.params.id;
    var pagenumber = parseInt(req.params.page) || 1 ;
    const genrelink = `https://aniwatchtv.to/genre/${genreneed}?page=${pagenumber}`;
    const genrelinkanni = `https://aniwatchtv.to/genre/${genreneed}?page=${pagenumber +1}`;



    try {
        const genreone = await axios.get(genrelink, {
            headers:{
                'User-Agent': USER_AGENT,
            }
        });
        const receivegenre = genreone.data;

        const $ = cheerio.load(receivegenre);

        const nextpageani = await axios.get(genrelinkanni, {
            headers:{
                'User-Agent': USER_AGENT,
            }
        });
    
        const nextpageanime = nextpageani.data;
    
        const $1 = cheerio.load(nextpageanime);
    
        const availablepage = $1('.flw-item').find('.dynamic-name').text() || null;
    
        if( availablepage == null){
            var nextpageavai = null;
        }
        else{
            var nextpageavai = true;
        }
    
        var nextpageavai = nextpageavai;


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

        res.json({ genrey: genrey, nextpageavai: nextpageavai, genreX});
    } catch (error) {
        console.log('In Error.',error)
        res.send('Check Your Demand //frozen');
    }
})


module.exports = genre;
