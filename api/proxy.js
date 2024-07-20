const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/proxy', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  request(
    { url, headers: { 'User-Agent': 'Mozilla/5.0' } },
    (error, response, body) => {
      if (error) {
        return res.status(500).send('Error');
      }
      res.set('Content-Type', response.headers['content-type']);
      res.send(body);
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
