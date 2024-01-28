# Aniwatch-Api
This Is The Api Of Aniwatch.to (Zoro.to). Made With Express.js.


## Getting Started

To get started, you can use the following endpoints:

### 1. Fetch Home Page Data

**Endpoint:** `https://aniwatch-api-v1-0.onrender.com/api/parse`

**Request Sample:**
```javascript
const resp = await fetch("https://aniwatch-api-v1-0.onrender.com/api/parse");
const data = await resp.json();
console.log(data);
```

**Response Sample:**
```
{
"slides": [
{
"name": "The Apothecary Diaries",
"jname": "Kusuriya no Hitorigoto",
"spotlight": "#1 Spotlight",
"imageAnime": "https://img.flawlessfiles.com/_r/1366x768/100/31/aa/31aacbf403a8f1c180a940009dbf17f5/31aacbf403a8f1c180a940009dbf17f5.jpeg",
"format": "TV",
"duration": "24m",
"release": "Oct 22, 2023",
"quality": "HD",
"animeId": "the-apothecary-diaries-18578",
"anidesc": "In an imperial court in ancient China, it has been a few months since a 17-year-old girl known as Maomao was kidnapped and forced to work as a low-level servant at the emperor's palace. Still, she manages to retain her curious and pragmatic spirit, planning to work until her years of servitude are over. One day, however, she catches wind of the fact that the emperor's two infants have fallen gravely ill. She decides to secretly take action, drawing on her experience as a pharmacist raised in the poor red-light district.  Despite Maomao's attempts to remain anonymous, she soon catches the eye of Jinshi, an influential eunuch who recognizes her talents. Maomao soon finds herself in the emperor's inner court, where she gradually makes a name for herself by utilizing her knowledge and eccentric personality to solve various medical mysteries."
},
...
]
"trend": [
{
"name": "One Piece",
"ranking": "01",
"imgAni": "https://img.flawlessfiles.com/_r/300x400/100/54/90/5490cb32786d4f7fef0f40d7266df532/5490cb32786d4f7fef0f40d7266df532.jpg",
"jname": "One Piece",
"iD": "one-piece-100"
},
...
]
"UpcomingAnime": [
{
"name": "Shangri-La Frontier",
"format": "TV",
"release": "25m",
"idani": "shangri-la-frontier-18567",
"imgAnime": "https://img.flawlessfiles.com/_r/300x400/100/de/c4/dec411fa0ea5a64ac23c94b4444d8bdb/dec411fa0ea5a64ac23c94b4444d8bdb.jpg"
},
...
]
}
```

### `GET` Search Anime 

#### Endpoint

```sh
https://aniwatch-api-v1-0.onrender.com/api/search/${query_parameter}/${page}
```

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
|   `query_parameter`    | string | The Anime You Want To See.. |    Yes    |   --    |
|   `page`    | int | ----- |    Yes    |   1   |

#### Request sample

```javascript
const resp = await fetch("https://aniwatch-api-v1-0.onrender.com/api/search/your%20name/1");
const data = await resp.json();
console.log(data);
```

### Response Sample

```
{
"nextpageavailable": true,
"searchYour": [
{
"name": "Your Name",
"jname": "Kimi no Na wa.",
"format": "Movie",
"duration": "106m",
"idanime": "your-name-10",
"sub": "1",
"dubani": "1",
"totalep": false,
"img": "https://img.flawlessfiles.com/_r/300x400/100/16/ee/16eec56baf8f3fcc6430607f58ce3d12/16eec56baf8f3fcc6430607f58ce3d12.jpg",
"pg": false
},
...
]
}
```

### GET Anime Genre 

 **Endpoint**

```sh
https://aniwatch-api-v1-0.onrender.com/api/genre/${genre_name}/${pagee}
```

#### Path Parameters

| Parameter |  Type  |               Description                | Required? | Default |
| :-------: | :----: | :--------------------------------------: | :-------: | :-----: |
|  `genre_name`   | string | The name of anime genre . |    Yes    |   --    |
|  `page`   | int | ------ |    Yes    |   1    |


#### Request sample

```javascript
const resp = await fetch(
  "https://aniwatch-api-v1-0.onrender.com/api/genre/romance/1"
);
const data = await resp.json();
console.log(data);
```

### Response Sample

```
{
"genrey": "Romance Anime",
"nextpageavai": true,
"genreX": [
{
"name": "Ranma ½ OVA",
"jname": "Ranma ½ OVA",
"format": "OVA",
"duration": "30m",
"sub": "6",
"dubXanime": "6",
"totalepX": "6",
"descX": "Ranma Saotome continues his search for a way to become a normal teenage boy again. He gets into many hilarious situations involving the many girls in his life. One of the biggest challenges is overcoming the proposals from others who have found a suitable bride for Ranma. But he has his own worries and must muster up the best of his wits and martial arts to keep his sanity. It's not easy being desired by so many women (and men) and not breaking hearts of a few along the way. He just might be able to find it in his heart to confess to Akane or simply find another excuse that he can't marry such a tomboy girl. \n\n(Source: ANN)",
"imageX": "https://img.flawlessfiles.com/_r/300x400/100/06/c9/06c902b091ea5ae2c711b6e00fa3705a/06c902b091ea5ae2c711b6e00fa3705a.jpg",
"idX": "ranma-ova-906"
},
...
]
}
```

### GET Anime Schedule

**Endpoint**

```sh
https://aniwatch-api-v1-0.onrender.com/api/shedule/${date}
```

### Request Sample

```javascript
const resp = await fetch(
  "https://aniwatch-api-v1-0.onrender.com/api/shedule/2024-01-28"
);
const data = await resp.json();
console.log(data);
```

### Response Sample

```
{
"Sheduletoday": [
{
"name": "The Apothecary Diaries",
"jname": "Kusuriya no Hitorigoto",
"time": "00:15",
"epshedule": "Episode 16"
},
...
]
}
```

### GET Anime Info

**Endpoint**

```sh
https://aniwatch-api-v1-0.onrender.com/api/related/${id}
```

#### Path Parameters

| Parameter |  Type  |               Description                | Required? | Default |
| :-------: | :----: | :--------------------------------------: | :-------: | :-----: |
|  `id`   | string | ------ |    Yes    |   --    |

### Request Sample

```javascript
const resp = await fetch(
  "https://aniwatch-api-v1-0.onrender.com/api/related/hunter-x-hunter-128"
);
const data = await resp.json();
console.log(data);
```

### Response Sample

```
{
"infoX": [
{
"name": "Hunter x HunterHunter x Hunter",
"jname": "Hunter x Hunter",
"pganime": "PG-13",
"quality": "HD",
"epsub": "62",
"epdub": "62",
"totalep": "62",
"format": "TV",
"duration": "23m",
"desc": "Hunters are specialized in a wide variety of fields, ranging from treasure hunting to cooking. They have access to otherwise unavailable funds and information that allow them to pursue their dreams and interests. However, being a hunter is a special privilege, only attained by taking a deadly exam with an extremely low success rate.\n\nGon Freecss, a 12-year-old boy with the hope of finding his missing father, sets out on a quest to take the Hunter Exam. Along the way, he picks up three companions who also aim to take the dangerous test: the revenge-seeking Kurapika, aspiring doctor Leorio Paladiknight, and a mischievous child the same age as Gon, Killua Zoldyck.\n\nHunter x Hunter is a classic shounen that follows the story of four aspiring hunters as they embark on a perilous adventure, fighting for their dreams while defying the odds.\n\n[Written by MAL Rewrite]\n                                \n                                        Hunters are specialized in a wide variety of fields, ranging from treasure hunting to cooking. They have access to otherwise unavailable funds and information that allow them to pursue their dreams and interests. However, being a hunter is a special privilege, only attained by taking a deadly exam with an extremely low success rate.\n\nGon Freecss, a 12-year-old boy with the hope of finding his missing father, sets out on a quest to take the Hunter Exam. Along the way, he picks up three companions who also aim to take the dangerous test: the revenge-seeking Kurapika, aspiring doctor Leorio Paladiknight, and a mischievous child the same age as Gon, Killua Zoldyck.\n\nHunter x Hunter is a classic shounen that follows the story of four aspiring hunters as they embark on a perilous adventure, fighting for their dreams while defying the odds.\n\n[Written by MAL Rewrite]",
"id": "hunter-x-hunter-128",
"image": "https://img.flawlessfiles.com/_r/300x400/100/45/c5/45c50af44712f05b30c9cbfba6283abb/45c50af44712f05b30c9cbfba6283abb.jpg"
},
{
"japanese": "HUNTER×HUNTER（ハンター×ハンター）",
"aired": "Oct 16, 1999 to Mar 31, 2001",
"premired": "Fall 1999",
"statusAnime": "Finished Airing",
"malscore": "8.4",
"genre": [
"Action",
"Adventure",
"Fantasy",
"Shounen",
"Super Power"
],
"studio": "Nippon Animation",
"producer": [
"Fuji TV",
"Nippon Animation",
"Viz Media"
]
},
{
"animechar": [
{
"name": "Freecss, GonTakeuchi, Junko",
"voice": "Takeuchi, Junko",
"animeImg": "https://img.flawlessfiles.com/_r/100x100/100/6b/cb/6bcb79c4b6b809027fa3fc801ad679cd/6bcb79c4b6b809027fa3fc801ad679cd.jpg",
"animedesignation": "Main",
"voicelang": "Japanese",
"voiceImageX": "https://img.flawlessfiles.com/_r/100x100/100/08/5b/085b74052135dff713b4e797bf9d0214/085b74052135dff713b4e797bf9d0214.jpg"
},
{
"name": "KurapikaKaida, Yuki",
"voice": "Kaida, Yuki",
"animeImg": "https://img.flawlessfiles.com/_r/100x100/100/f5/4c/f54cfb491c808d407b08476242426e76/f54cfb491c808d407b08476242426e76.jpg",
"animedesignation": "Main",
"voicelang": "Japanese",
"voiceImageX": "https://img.flawlessfiles.com/_r/100x100/100/58/fa/58fa02edd045ed365c7851cbce6d5482/58fa02edd045ed365c7851cbce6d5482.jpg"
},
{
"name": "Paladiknight, LeorioDe ambrosis, Massimo",
"voice": "De ambrosis, Massimo",
"animeImg": "https://img.flawlessfiles.com/_r/100x100/100/fb/17/fb1719d08bfe4670ba1e8fc27e32fad2/fb1719d08bfe4670ba1e8fc27e32fad2.jpg",
"animedesignation": "Main",
"voicelang": "Italian",
"voiceImageX": "https://img.flawlessfiles.com/_r/100x100/100/3a/22/3a22b7fdf56149b9de2751db44f5f28a/3a22b7fdf56149b9de2751db44f5f28a.jpg"
},
{
"name": "Zoldyck, KilluaMitsuhashi, Kanako",
"voice": "Mitsuhashi, Kanako",
"animeImg": "https://img.flawlessfiles.com/_r/100x100/100/02/39/02394a02d4f259850e5c471335ef60ca/02394a02d4f259850e5c471335ef60ca.jpg",
"animedesignation": "Main",
"voicelang": "Japanese",
"voiceImageX": "https://img.flawlessfiles.com/_r/100x100/100/1d/de/1dde11edc488e0f7a68392be018f8cc9/1dde11edc488e0f7a68392be018f8cc9.jpg"
},
{
"name": "AbeMizutani, Keiko",
"voice": "Mizutani, Keiko",
"animeImg": "https://img.flawlessfiles.com/_r/100x100/100/f1/96/f196167d7f10d58047b73bd9dec4f55b/f196167d7f10d58047b73bd9dec4f55b.jpg",
"animedesignation": "Supporting",
"voicelang": "Japanese",
"voiceImageX": "https://img.flawlessfiles.com/_r/100x100/100/18/b0/18b07986a97e7c80757bf63684365ad3/18b07986a97e7c80757bf63684365ad3.jpg"
},
{
"name": "AgonCastro, Mauro",
"voice": "Castro, Mauro",
"animeImg": "https://img.flawlessfiles.com/_r/100x100/100/dd/f2/ddf2e8cb20cd532f80ff2d651a745667/ddf2e8cb20cd532f80ff2d651a745667.jpg",
"animedesignation": "Supporting",
"voicelang": "Brazilian",
"voiceImageX": "https://img.flawlessfiles.com/_r/100x100/100/b6/44/b6448fa13594f7c327a4648ebb335695/b6448fa13594f7c327a4648ebb335695.jpg"
}
]
}
]
}
```

### GET MOVIE ANIME

**Endpoint**

```sh
https://aniwatch-api-v1-0.onrender.com/api/mix/${query_paramenter}/${page}
```
### Request Sample

```javascript
const resp = await fetch(
  "https://aniwatch-api-v1-0.onrender.com/api/mix/tv/1"
);
const data = await resp.json();
console.log(data);
```

### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
|   `query_parameter`    | string | The Anime You Want To See.. |    Yes    |   --    |
|   `page`    | int | ----- |    Yes    |   1   |
|   `movie,ova,ona,subbed-anime,dubbed-anime,special,tv,popular,`    | string | The Anime You Want To See.. |    Yes    |   --    |


### Response Sample

```
{
"nextpageavai": true,
"mixAni": [
{
"name": "Isekai Onsen Paradise [UNCENSORED]",
"jname": "Meitou \"Isekai no Yu\" Kaitakuki: Around 40 Onsen Mania no Tensei Saki wa, Nonbiri Onsen Tengoku deshita [UNCENSORED]",
"format": "TV",
"duration": "3m",
"idanime": "isekai-onsen-paradise-uncensored-18982",
"sub": "2",
"dubani": false,
"totalep": false,
"img": "https://img.flawlessfiles.com/_r/300x400/100/86/0e/860e709b923e7295527377edc45b9060/860e709b923e7295527377edc45b9060.jpg",
"pg": "18+"
},
...
]
}
```

### GET Anime Episode

### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
|   `id`    | string | ------ |    Yes    |   --    |


**Endpoint**

```sh
https://aniwatch-api-v1-0.onrender.com/api/episode/${id}
```

### Request Sample

```javascript
const resp = await fetch(
  "https://aniwatch-api-v1-0.onrender.com/api/episode/hunter-x-hunter-128"
);
const data = await resp.json();
console.log(data);
```

### Response Sample

```
{
"episodetown": [
{
"order": "1",
"name": "A Boy Setting Out for a Journey × Leaving Behind the Sound of the Wind",
"epId": "hunter-x-hunter-128?ep=3661"
},
...
]
}
```

### GET ANIME SERVER

**Endpoint**

```sh
https://aniwatch-api-v1-0.onrender.com/api/server/${epId}
```

### Request Sample

```javascript
const resp = await fetch(
  "https://aniwatch-api-v1-0.onrender.com/api/server/ep=3662"
);
const data = await resp.json();
console.log(data);
```

### Response Sample

```
{
"sub": [
{
"server": "vidstreaming",
"id": "4",
"srcId": "636137"
},
{
"server": "megacloud",
"id": "1",
"srcId": "411986"
},
{
"server": "streamsb",
"id": "5",
"srcId": "830715"
},
{
"server": "streamtape",
"id": "3",
"srcId": "830716"
}
],
"dub": [
{
"server": "vidstreaming",
"id": "4",
"srcId": "582275"
},
{
"server": "megacloud",
"id": "1",
"srcId": "2720"
},
{
"server": "streamsb",
"id": "5",
"srcId": "714095"
},
{
"server": "streamtape",
"id": "3",
"srcId": "736795"
}
]
}
```

### GET Anime ServerLink

**Endpoint**

```sh
https://aniwatch-api-v1-0.onrender.com/api/server/${srcId}
```

### Request Sample

```javascript
const resp = await fetch(
  "https://aniwatch-api-v1-0.onrender.com/api/server/2720"
);
const data = await resp.json();
console.log(data);
```

### Response Sample

```
{
"serverSrc": [
{
"serversrcwatch": {
"type": "iframe",
"link": "https://megacloud.tv/embed-2/e-1/vEKIP50mN3OK?k=1",
"server": 1,
"sources": [],
"tracks": [],
"htmlGuide": ""
}
}
]
}
```
