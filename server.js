const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // <- CORS fix

app.get('/generate', async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing "prompt" query parameter.' });
  }

  try {
    const encodedPrompt = encodeURIComponent(prompt);
    const pollinationsURL = `https://text.pollinations.ai/${encodedPrompt}`;

    const response = await axios.get(pollinationsURL);
    res.status(200).send(response.data);
  } catch (error) {
    console.error('Error fetching from Pollinations:', error.message);
    res.status(500).json({ error: 'Failed to fetch from Pollinations' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
