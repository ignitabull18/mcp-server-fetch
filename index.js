const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// MCP server fetch endpoint
app.post('/fetch', async (req, res) => {
  try {
    const { url, options } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const response = await fetch(url, options);
    const data = await response.text();
    
    res.json({
      status: response.status,
      statusText: response.statusText,
      headers: response.headers.raw(),
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`MCP server fetch listening on port ${PORT}`);
});