const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
// const port = 3000;

const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";



// Route to parse information from a website
app.get('/parse', async (req, res) => {
  try {
    // URL of the website you want to parse
    const websiteUrl = 'https://aniwatchtv.to/home';

    // Fetch HTML content from the website
    const response = await axios.get(websiteUrl, {
      headers:{
        'User-Agent': USER_AGENT,
      }
    });
    const html = response.data;

    // Load HTML content into Cheerio
    const $ = cheerio.load(html);

    // Extract data from elements with class '.desi-sub-text'
    const slides = [];
    $('.deslide-item').each((index, element) => {
      const name = $(element).find('.dynamic-name').text();
      const jname = $(element).find('.dynamic-name').attr('data-jname');
      const spotlight = $(element).find('.desi-sub-text').text();
      const imageAnime = $(element).find('.deslide-cover-img img').attr('data-src');
      const format = $(element).find('.sc-detail .scd-item:first').text().trim();
      const duration = $(element).find('.sc-detail .scd-item:eq(1)').text().trim();
      const release = $(element).find('.sc-detail .scd-item:eq(2)').text().trim();
      const quality = $(element).find('.sc-detail .scd-item:eq(3)').text().trim();
      const animeId = $(element).find('.desi-buttons a:eq(1)').attr('href').split('/')[1];
      const anidesc = $(element).find('.desi-description').text().trim();
      slides.push({ name, jname, spotlight, imageAnime, format, duration, release, quality, animeId, anidesc});
    });

    const trend = [];
    $('.swiper-slide.item-qtip').each(function(index,element){
      const name = $(element).find('.dynamic-name').text();
      const jname = $(element).find('.dynamic-name').attr('data-jname');
      const ranking = $(element).find('.number span').text();
      const imgAni = $(element).find('.film-poster img').attr('data-src');
      const iD = $(element).find('.item a').attr('href').split('/')[1];

      trend.push({ name, ranking, imgAni, jname, iD});
      console.log(trend);
    });

    const UpcomingAnime = [];
    $('.cat-headi').text()== "Upcoming Anime";
    $('.flw-item').each(function(index,element){
      const name = $(element).find('.dynamic-name').text();
      const jname = $(element).find('dynamic-name').attr('data-jname');
      const format = $(element).find('.fdi-item:first').text();
      const release = $(element).find('.fdi-item.fdi-duration').text();
      const idani = $(element).find('.film-name a').attr('href').split('/')[1];
      const imgAnime = $(element).find('.film-poster img').attr('data-src');

      UpcomingAnime.push({ name, jname, format, release, idani, imgAnime});
    });

    // Send the parsed information as JSON
    res.json({ slides, trend, UpcomingAnime });
  } catch (error) {
    console.error('Error parsing website:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;