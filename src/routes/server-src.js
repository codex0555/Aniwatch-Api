const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const CryptoJS = require("crypto-js");

const src = express();
const cors = require('cors');

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";
const ACCEPT_ENCODING_HEADER = "gzip, deflate, br";

src.use(cors());
src.use(express.json());

class RapidCloud {
  constructor() {
    this.serverName = "RapidCloud";
    this.sources = [];
    this.fallbackKey = "c1d17096f2ca11b7";
    this.host = "https://rapid-cloud.co";
  }

  async extract(videoUrl) {
    const result = {
      sources: [],
      subtitles: [],
    };

    const serverSrc = []; // Declare serverSrc here

    try {
      const id = videoUrl.href.split("/").pop()?.split("?")[0];
      const options = {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      };

      let res = null;

      res = await axios.get(
        `https://${videoUrl.hostname}/embed-2/ajax/e-1/getSources?id=${id}`,
        options
      );

      let {
        data: { sources, tracks, intro, encrypted },
      } = res;

      let decryptKey = await (
        await axios.get(
          "https://raw.githubusercontent.com/theonlymo/keys/e1/key"
        )
      ).data;

      decryptKey = this.substringBefore(
        this.substringAfter(decryptKey, '"blob-code blob-code-inner js-file-line">'),
        "</td>"
      );

      if (!decryptKey) {
        decryptKey = await (
          await axios.get(
            "https://raw.githubusercontent.com/theonlymo/keys/e1/key"
          )
        ).data;
      }

      if (!decryptKey) decryptKey = this.fallbackKey;

      console.log("Decryption Key:", decryptKey);
      console.log("Encrypted Sources:", sources);

      try {
        if (encrypted) {
          const sourcesArray = sources.split("");
          let extractedKey = "";
          let currentIndex = 0;

          for (const index of decryptKey) {
            const start = index[0] + currentIndex;
            const end = start + index[1];

            for (let i = start; i < end; i++) {
              extractedKey += sourcesArray[i];
              sourcesArray[i] = "";
            }
            currentIndex += index[1];
          }

          decryptKey = extractedKey;
          sources = sourcesArray.join("");

          console.log("Extracted Key:", decryptKey);
          console.log("Decrypted Sources:", sources);

          const decrypt = CryptoJS.AES.decrypt(sources, decryptKey);
          result.sources = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8)); // Update result.sources

          console.log("Final Decrypted Sources:", result.sources);

          serverSrc.push({ sources: result.sources }); // Push to serverSrc

        }
      } catch (err) {
        console.error(err.message);
        throw new Error("Cannot decrypt sources. Perhaps the key is invalid.");
      }

      console.log("Result:", result);
      result.subtitles = tracks
      .map((s) =>
        s.file
          ? { url: s.file, lang: s.label ? s.label : "Thumbnails" }
          : null
      )
      .filter((s) => s);

    return result;
  
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  substringAfter(str, toFind) {
    const index = str.indexOf(toFind);
    return index === -1 ? "" : str.substring(index + toFind.length);
  }

  substringBefore(str, toFind) {
    const index = str.indexOf(toFind);
    return index === -1 ? "" : str.substring(0, index);
  }
}

const rapidCloud = new RapidCloud();

src.get('/server-src/:id', async (req, res) => {
  const serversrc = req.params.id.match(/\d+/);
  const serversrclink = `https://aniwatchtv.to/ajax/v2/episode/sources?id=${serversrc}`;

  try {
    const serversrcani = await axios.get(serversrclink, {
      headers: {
        'User-Agent': USER_AGENT,
        "Accept-Encoding": ACCEPT_ENCODING_HEADER,
      }
    });
    const serversrcwatch = serversrcani.data;

    const serverSrc = [];

    const serverlinkAni = serversrcwatch.link;
    const encryptedID = serverlinkAni.split('/e-1/')[1];

    const videoUrl = new URL(`https://megacloud.tv/embed-2/e-1/${encryptedID}`);
    const result = await rapidCloud.extract(videoUrl);
    const rest = result.sources;
    const sub = result.subtitles;

    const mega = "The Mega Link May Not Work.So You Can Go With Alternative."

    serverSrc.push({ text: mega, serverlinkAni, rest, sub});

    res.json({ serverSrc });
  } catch (error) {
    console.log('error .......', error);
  }
});

module.exports = src;
