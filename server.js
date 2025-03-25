const express = require('express');
const cors = require('cors');
const request = require('request');
const app = express();
app.use(cors());

app.get('/image', (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).send("Missing 'url' parameter");

  request.get({ url: imageUrl, encoding: null }, (err, resp, buffer) => {
    if (!err && resp.statusCode === 200) {
      res.set("Content-Type", resp.headers["content-type"]);
      res.set("Access-Control-Allow-Origin", "*");
      res.send(buffer);
    } else {
      res.status(500).send("Image fetch failed");
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Image Proxy running on port ${PORT}`));
