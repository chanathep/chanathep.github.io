const express = require('express');
const app = express();
const port = 3000;

// In-memory store
let memoryStore = {};

app.use(express.json());

// POST /mem/set
app.post('/mem/set', (req, res) => {
  const { k, v } = req.body;
  if (k === undefined || v === undefined) {
    return res.status(400).send({ message: 'Key (k) and value (v) are required.' });
  }
  memoryStore[k] = v;
  res.status(200).send({ message: 'Value set successfully.' });
});

// GET /mem/get
app.get('/mem/get', (req, res) => {
  const { k } = req.query;
  if (k === undefined) {
    return res.status(400).send({ message: 'Key (k) is required as a query parameter.' });
  }
  if (memoryStore.hasOwnProperty(k)) {
    res.status(200).send({ value: memoryStore[k] });
  } else {
    res.status(404).send({ message: 'Key not found.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
