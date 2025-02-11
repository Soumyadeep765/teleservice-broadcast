const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.all("/broadcast", async (req, res) => {
  try {
    const rawBody = req.body;

    const { data, status } = await axios.post(
      "https://api.teleservices.io/Broadcast/broadcast/",
      rawBody,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to connect to the API",
      details: error.response ? error.response.data : error.message,
    });
  }
});

module.exports = app;
