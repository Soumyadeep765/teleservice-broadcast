const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/adduser", async (req, res) => {
  const { access_token, bot_token, user_id } = req.body;

  if (!access_token || !bot_token || !user_id) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const { data, status } = await axios.post("https://api.teleservices.io/Broadcast/adduser/", {
      access_token,
      bot_token,
      user_id,
    });

    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to connect to the API",
      details: error.response ? error.response.data : error.message,
    });
  }
});

// Export the app for Vercel
module.exports = app;
