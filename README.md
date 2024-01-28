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

#### Endpoint

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

### GET Anime Info

```javascript
const resp = await fetch(
  "https://aniwatch-api-v1-0.onrender.com/api/related/"
);
const data = await resp.json();
console.log(data);
```

