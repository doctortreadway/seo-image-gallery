const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/image", async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).send("Missing image URL");

  try {
    const response = await fetch(imageUrl);
    const contentType = response.headers.get("content-type");
    const buffer = await response.buffer();

    res.set("Content-Type", contentType || "image/jpeg");
    res.set("Access-Control-Allow-Origin", "*");
    res.send(buffer);
  } catch (err) {
    console.error("Image fetch error:", err);
    res.status(500).send("Image fetch failed.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Image proxy running on port ${PORT}`));
