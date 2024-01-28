const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const mix = express();

const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";



mix.get('/mix/:id/:page?', async ( req, res)=>{
    const mixid = req.params.id;
    var pagenumber = parseInt(req.params.page) || 1;
    const mixlink = `https://aniwatchtv.to/${mixid}?page=${pagenumber}`;
    const mixlinkani = `https://aniwatchtv.to/${mixid}?page=${pagenumber +1}`;

    try {
        const mixanime = await axios.get(mixlink, {
            headers:{
                'User-Agent': USER_AGENT,
            }
        });
        const mixcomponet = mixanime.data;

        const $ = cheerio.load(mixcomponet);

        const nextpageani = await axios.get(mixlinkani, {
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

        const mixAni =[];

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
    
            mixAni.push({ name, jname, format, duration, idanime, sub, dubani, totalep, img, pg});
        })
    
        res.json({ nextpageavai: nextpageavai, mixAni});
        
    } catch (error) {
        console.log('new Error');
    }
})

module.exports = mix;
