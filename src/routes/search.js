const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const search = express();
//const port = 3000;
const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";

search.get('/search/:id/:page?', async (req , res)=>{
    const searchdetails = req.params.id;
    var pagenumber = parseInt(req.params.page) || 1;
    const searchlink = `https://aniwatchtv.to/search?keyword=${searchdetails}&page=${pagenumber}`;
    const searchlinkani = `https://aniwatchtv.to/search?keyword=${searchdetails}&page=${pagenumber +1}`;

   try {
    const searchmob = await axios.get(searchlink, {
        headers:{
            'User-Agent': USER_AGENT,
        }
    });
    const searchgiven = searchmob.data;

    const $ = cheerio.load(searchgiven);

    const searchYour = [];

    const nextpageani = await axios.get(searchlinkani, {
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

    $('.flw-item').each((index,element)=>{
        const name = $(element).find('.dynamic-name').text();
        const jname = $(element).find('.dynamic-name').attr('data-jname');
        const format = $(element).find('.fdi-item:first').text();
        const duration = $(element).find('.fdi-item:eq(1)').text();
        const idanime = $(element).find('.film-name a').attr('href').split('/')[1].split('?')[0];
        const sub = $(element).find('.tick-sub').text();
        const dubani = $(element).find('.tick-dub').text() || false;
        const totalep = $(element).find('.tick-eps').text() || false;
        const img = $(element).find('.film-poster img').attr('data-src');
        const pg = $(element).find('.tick-rate').text() || false;

        searchYour.push({ name, jname, format, duration, idanime, sub, dubani, totalep, img, pg});
    })

    res.json({nextpageavailable: nextpageavai, searchYour});
   } catch (error) {
    console.log('Error sPOTTED',error);
   }
})



module.exports = search;