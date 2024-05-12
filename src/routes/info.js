const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const info = express();
//const port = 3000;
const cors = require('cors');

const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";

info.use(cors());


info.get('/related/:id', async function(req, res) {
    try {
        // Accessing the URL and query parameters from the request object
        const animeinfo = req.params.id;
        const animeinfourl = `https://aniwatchtv.to/${animeinfo}`;

        const animeinfofetch = await axios.get(animeinfourl, {
            headers:{
                'User-Agent':USER_AGENT,
            }
        });
        const animeresponse = animeinfofetch.data;

        const $ = cheerio.load(animeresponse);

        const infoX = [];

        $('.anis-content').each(function(index, element){
            const name = $(element).find('.film-name.dynamic-name').text();
            const jname = $(element).find('.dynamic-name').attr('data-jname');
            const pganime = $(element).find('.tick-pg').text();
            const quality = $(element).find('.tick-quality').text();
            const epsub = $(element).find('.tick-sub').text();
            const epdub = $(element).find('.tick-dub').text() || false;
            const totalep = $(element).find('.tick-eps').text() || false;
            const format = $(element).find('.item:eq(0)').text();
            const duration = $(element).find('.item:eq(1)').text();
            const desc = $(element).find('.text').text().trim();
            const id = $(element).find('.film-buttons a').attr('href').split('/watch/')[1];
            const image = $(element).find('.film-poster img').attr('src');
            

            infoX.push({ name, jname, pganime, quality, epsub, epdub, totalep, format, duration, desc, id, image });
        });

        const mal_id = $('#syncData').text().split('"mal_id":"')[1].split('",')[0] || null;

        const aniid = $('#syncData').text().split('"anilist_id":"')[1].split('",')[0] || null;

        $('.anisc-info').each(function(index, element){
            const japanese = $(element).find('.name:eq(0)').text();
            const aired = $(element).find('.name:eq(2)').text();
            const premired = $(element).find('.name:eq(3)').text();
            const statusAnime = $(element).find('.name:eq(5)').text();
            const malscore = $(element).find('.name:eq(6)').text();
            const genre = $(element).find('.item-list a').map((index, element) => $(element).text()).get();
            const studio = $(element).find('.name:eq(7)').text();
            const producer = $(element).find('.item-title:eq(9) a').map((index,element) => $(element).text()).get();

            infoX.push({ japanese, aired, premired, statusAnime, malscore, genre, studio, producer});
        })

        $('.bac-list-wrap').each(function(index, element){
            const animechar = $(element).find('.bac-item').map((index, element) => ({name: $(element).find('.pi-name').text() || null, voice : $(element).find('.per-info.rtl h4').text() || null, animeImg : $(element).find('.per-info.ltr img').attr('data-src') || null, animedesignation : $(element).find('.pi-cast:first').text(), voicelang : $(element).find('.per-info.rtl span').text() || null, voiceImageX : $(element).find('.per-info.rtl img').attr('data-src') || null})).get() || null;


            infoX.push({ animechar});
        })

        $('.block_area-seasons').each(function(index, element){
            const season = $('.os-list a').map((index, element) => ({
                id:  $(element).attr('href').split('/')[1], Seasonname: $(element).attr('title')})).get();
              


            infoX.push({ season});
        })

        const recommendation = [];
        $('.film_list-wrap').find('.flw-item').each(( index, element)=>{
            const name = $(element).find('.film-name').text() || null;
            const jname = $(element).find('.film-name a').attr('data-jname') || null;
            const sub = $(element).find('.tick-item.tick-sub').text() ;
            const dub = $(element).find('.tick-item.tick-dub').text() || 0;
            const total = $(element).find('.tick-item.tick-eps').text() || null;
            const xid = $(element).find('a').attr('href').split('/')[1] || null;
            const image = $(element).find('img').attr('data-src') || null;
            const format = $(element).find('.fdi-item:first').text() || null;
            const duration = $(element).find('.fdi-duration').text() || null;

            recommendation.push({ name, jname, sub, dub, total, xid, image, format, duration});
        })
        
        res.json({ infoX , mal_id, aniid, recommendation});

    } catch (error) {
        console.error('Error processing related route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = info;
