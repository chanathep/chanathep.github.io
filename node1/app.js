const express = require('express');
const app = express();
const port = 3000;

// Read token from environment variable or use a default
let apiToken = process.env.NODE_TOKEN;
if (!apiToken) {
  apiToken = "DEFAULT_SECURE_TOKEN_REPLACE_ME";
  console.warn("Warning: NODE_TOKEN environment variable not set. Using default token. This is not secure for production.");
}

// In-memory store
let memoryStore = {};

app.use(express.json());

// Authentication middleware for /mem/set
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (token == null) {
    return res.status(401).send({ message: 'Unauthorized: Authorization header missing.' });
  }

  if (token !== apiToken) {
    return res.status(401).send({ message: 'Unauthorized: Invalid token.' });
  }
  next(); // Token is valid, proceed to the route handler
};

// POST /mem/set - now protected
app.post('/mem/set', authenticateToken, (req, res) => {
  const { k, v } = req.body;
  // k and v presence is already checked by authenticateToken or should be.
  // However, it's good practice to ensure req.body itself is what you expect.
  if (k === undefined || v === undefined) {
    // This check might be redundant if your middleware also checks req.body structure,
    // but good for robustness if middleware only checks token.
    return res.status(400).send({ message: 'Key (k) and value (v) are required in the request body.' });
  }
  memoryStore[k] = v;
  res.status(200).send({ message: 'Value set successfully.' });
});

// GET /mem/get - remains unprotected
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
