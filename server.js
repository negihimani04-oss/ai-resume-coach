const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());

app.post("/analyze", async (req, res) => {
  const text = req.body.text;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Analyze resume:\n${text}` }]
        }]
      }),
    }
  );

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Server running"));
