const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express(); // 

app.use(cors());

app.get('/image', async (req, res) => {
  const imageUrl = req.query.url;
  console.log("Incoming image request for:", imageUrl);

  if (!imageUrl) {
    return res.status(400).send("Missing 'url' parameter");
  }

  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://pixabay.com/',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive'
      }
    });

    res.set('Content-Type', response.headers['content-type']);
    res.set('Access-Control-Allow-Origin', '*');
    res.send(response.data);
    console.log("✅ Image fetched and sent successfully");
  } catch (error) {
    console.error("❌ Image fetch failed:", error.message);
    res.status(500).send("Image fetch failed");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Image Proxy running on port ${PORT}`));
