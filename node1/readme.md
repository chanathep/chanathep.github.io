# In-Memory Key-Value Store API (Node.js)

This project implements a simple in-memory key-value store API using Node.js and Express.js.

## Setup

### 1. Install Dependencies

Navigate to the `node1` directory and run the following command to install the necessary dependencies listed in `package.json`:

```bash
npm install
```

### 2. Start the API Server

To start the API server, run the following command from the `node1` directory:

```bash
npm start
```

The server will start and listen on `http://localhost:3000` by default.

### 3. Run Tests

To execute the test script and verify the API endpoints, run the following command from the `node1` directory:

```bash
node test.js
```

The script will send requests to the running server and print "All tests passed!" if successful, or error messages if any test fails. Ensure the server is running before executing the tests.

## API Endpoints

- `POST /mem/set`: Stores a key-value pair.
  - Request body (JSON): `{"k": "yourKey", "v": "yourValue"}`
  - Success response: `{ "message": "Value set successfully." }`
- `GET /mem/get`: Retrieves a value by its key.
  - Query parameter: `k=yourKey`
  - Success response: `{ "value": "yourValue" }`
  - Not found response: `{ "message": "Key not found." }`
