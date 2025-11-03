const express = require('express');
const app = express();
const port = 3000;

app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
  });
}

module.exports = app;