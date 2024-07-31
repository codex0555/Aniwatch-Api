const express = require('express');
const axios = require("axios");
const crypto = require("crypto");
const createHttpError = require("http-errors");
const cors = require('cors');

const src1 = express();
src1.use(cors());

const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";
const ACCEPT_ENCODING_HEADER = "gzip, deflate, br";

// Define the megacloud object
const megacloud = {
  script: "https://megacloud.tv/js/player/a/prod/e1-player.min.js?v=",
  sources: "https://megacloud.tv/embed-2/ajax/e-1/getSources?id=",
};

class MegaCloud {
  constructor() {
    this.serverName = "megacloud";
  }

  async extract(videoUrl) {
    try {
      const extractedData = {
        tracks: [],
        intro: {
          start: 0,
          end: 0,
        },
        outro: {
          start: 0,
          end: 0,
        },
        sources: [],
      };

      const videoId = videoUrl?.href?.split("/")?.pop()?.split("?")[0];
      const { data: srcsData } = await axios.get(
        megacloud.sources.concat(videoId || ""),
        {
          headers: {
            Accept: "*/*",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
            Referer: videoUrl.href,
          },
        }
      );
      if (!srcsData) {
        throw createHttpError.NotFound("Url may have an invalid video id");
      }

      const encryptedString = srcsData.sources;
      if (!srcsData.encrypted && Array.isArray(encryptedString)) {
        extractedData.intro = srcsData.intro;
        extractedData.outro = srcsData.outro;
        extractedData.tracks = srcsData.tracks;
        extractedData.sources = encryptedString.map((s) => ({
          url: s.file,
          type: s.type,
        }));

        return extractedData;
      }

      let text;
      const { data } = await axios.get(
        megacloud.script.concat(Date.now().toString())
      );

      text = data;
      if (!text) {
        throw createHttpError.InternalServerError(
          "Couldn't fetch script to decrypt resource"
        );
      }

      const vars = this.extractVariables(text);
      if (!vars.length) {
        throw new Error("Can't find variables. Perhaps the extractor is outdated.");
      }

      const { secret, encryptedSource } = this.getSecret(
        encryptedString,
        vars
      );
      const decrypted = this.decrypt(encryptedSource, secret);
      try {
        const sources = JSON.parse(decrypted);
        extractedData.intro = srcsData.intro;
        extractedData.outro = srcsData.outro;
        extractedData.tracks = srcsData.tracks;
        extractedData.sources = sources.map((s) => ({
          url: s.file,
          type: s.type,
        }));

        return extractedData;
      } catch (error) {
        throw createHttpError.InternalServerError("Failed to decrypt resource");
      }
    } catch (err) {
      throw err;
    }
  }

  extractVariables(text) {
    const regex =
      /case\s*0x[0-9a-f]+:(?![^;]*=partKey)\s*\w+\s*=\s*(\w+)\s*,\s*\w+\s*=\s*(\w+);/g;
    const matches = text.matchAll(regex);
    const vars = Array.from(matches, (match) => {
      const matchKey1 = this.matchingKey(match[1], text);
      const matchKey2 = this.matchingKey(match[2], text);
      try {
        return [parseInt(matchKey1, 16), parseInt(matchKey2, 16)];
      } catch (e) {
        return [];
      }
    }).filter((pair) => pair.length > 0);

    return vars;
  }

  getSecret(encryptedString, values) {
    let secret = "",
      encryptedSource = "",
      encryptedSourceArray = encryptedString.split(""),
      currentIndex = 0;

    for (const index of values) {
      const start = index[0] + currentIndex;
      const end = start + index[1];

      for (let i = start; i < end; i++) {
        secret += encryptedString[i];
        encryptedSourceArray[i] = "";
      }
      currentIndex += index[1];
    }

    encryptedSource = encryptedSourceArray.join("");

    return { secret, encryptedSource };
  }

  decrypt(encrypted, keyOrSecret, maybe_iv) {
    let key;
    let iv;
    let contents;
    if (maybe_iv) {
      key = keyOrSecret;
      iv = maybe_iv;
      contents = encrypted;
    } else {
      const cypher = Buffer.from(encrypted, "base64");
      const salt = cypher.subarray(8, 16);
      const password = Buffer.concat([
        Buffer.from(keyOrSecret, "binary"),
        salt,
      ]);
      const md5Hashes = [];
      let digest = password;
      for (let i = 0; i < 3; i++) {
        md5Hashes[i] = crypto.createHash("md5").update(digest).digest();
        digest = Buffer.concat([md5Hashes[i], password]);
      }
      key = Buffer.concat([md5Hashes[0], md5Hashes[1]]);
      iv = md5Hashes[2];
      contents = cypher.subarray(16);
    }

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const decrypted =
      decipher.update(
        contents,
        typeof contents === "string" ? "base64" : undefined,
        "utf8"
      ) + decipher.final();

    return decrypted;
  }

  matchingKey(value, script) {
    const regex = new RegExp(`,${value}=((?:0x)?([0-9a-fA-F]+))`);
    const match = script.match(regex);
    if (match) {
      return match[1].replace(/^0x/, "");
    } else {
      throw new Error("Failed to match the key");
    }
  }
}

module.exports = MegaCloud;
// Create an instance of MegaCloud
const megaCloudInstance = new MegaCloud();

src1.get('/src-server/:id', async (req, res) => {
    try {
        const servernum = parseInt(req.params.id);
        const serverlink = `https://aniwatchtv.to/ajax/v2/episode/sources?id=${servernum}`;
        const serreq = await axios.get(serverlink, {
            headers: {
                'User-Agent': USER_AGENT,
            }
        });
        const serres = serreq.data;
        const serhash = serres['link'].split('/e-1/')[1].split('?k=1')[0];

        const videoUrl = new URL(`https://megacloud.tv/embed-2/e-1/${serhash}?k=1`);

        // Use the MegaCloud instance to extract information from the video URL
        try {
            const result = await megaCloudInstance.extract(videoUrl);
            // Display the result
            console.log(result);
            res.json({ restres: result });
        } catch (error) {
            // Handle errors
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = src1;
