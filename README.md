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
