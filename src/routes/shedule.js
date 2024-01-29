const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const shedule = express();
const cors = require('cors');

const ACCEPT_ENCODING_HEADER = "gzip, deflate, br";
const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";
const ACCEPT_HEADER =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9";

shedule.use(cors());


shedule.get('/shedule/:id', async function( request, response){
    try {
        const date = request.params.id;
        const shedulewebsite = `https://aniwatchtv.to/ajax//schedule/list?tzOffset=-330&date=${date}`;

        const responseshedule = await axios.get(shedulewebsite, {
            headers:{
                'User-Agent': USER_AGENT,
                "Accept-Encoding": ACCEPT_ENCODING_HEADER,
            }
        });
        const retresponse = responseshedule?.data?.html;

        const $ = cheerio.load(retresponse);

        const Sheduletoday = [];

        $('li').each(function(index,element){
            const name = $(element).find('.dynamic-name').text();
            const jname = $(element).find('.dynamic-name').attr('data-jname');
            const time = $(element).find('.time').text();
            const epshedule = $(element).find('.btn').text().trim();

            Sheduletoday.push({ name, jname, time, epshedule});
        });

        response.json({ Sheduletoday});

    } catch (error) {
        console.log('The Shedule Is In Error.');
    }
})



module.exports = shedule;
