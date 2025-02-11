const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.all("/adduser", async (req, res) => {
  let access_token, bot_token, user_id;

  if (req.method === "POST") {
    ({ access_token, bot_token, user_id } = req.body);
  } else if (req.method === "GET") {
    ({ access_token, bot_token, user_id } = req.query);
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

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

// Export for Vercel
module.exports = app;
