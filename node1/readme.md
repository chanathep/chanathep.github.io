# In-Memory Key-Value Store API (Node.js)

This project implements a simple in-memory key-value store API using Node.js and Express.js. The `POST /mem/set` endpoint is protected and requires token authentication.

## Environment Variables

### `NODE_TOKEN` (for the server)
- **Purpose**: This environment variable is used to set the authentication token for securing the `POST /mem/set` endpoint.
- **Usage**: When starting the server, you should set `NODE_TOKEN` to a unique, secure string.
  ```bash
  NODE_TOKEN="your_very_secure_and_unique_token" npm start
  ```
- **Default Token**: If `NODE_TOKEN` is not set, the application will use a default token: `"DEFAULT_SECURE_TOKEN_REPLACE_ME"`.
  **Important**: For any real deployment or secure environment, you **must** set `NODE_TOKEN` to a strong, unique value. Relying on the default token is insecure. A warning will be logged to the console if the default token is used.

### `TEST_NODE_TOKEN` (for testing)
- **Purpose**: This environment variable is used by the test script (`test.js`) to authenticate requests to the protected `POST /mem/set` endpoint.
- **Usage**: If you have set a custom `NODE_TOKEN` for the server, you should set `TEST_NODE_TOKEN` to the same value when running tests, or to a specific token you wish to test against.
  ```bash
  TEST_NODE_TOKEN="your_very_secure_and_unique_token" node test.js
  ```
- **Default Token**: If `TEST_NODE_TOKEN` is not set, the test script will default to using `"DEFAULT_SECURE_TOKEN_REPLACE_ME"`. This allows tests to pass against a server running with the default `NODE_TOKEN`.

## Setup

### 1. Install Dependencies

Navigate to the `node1` directory and run the following command to install the necessary dependencies listed in `package.json`:

```bash
npm install
```

### 2. Start the API Server

To start the API server, run the following command from the `node1` directory. Remember to set the `NODE_TOKEN` environment variable for security.

```bash
# Replace with your actual secure token
NODE_TOKEN="your_very_secure_and_unique_token" npm start
```
The server will start and listen on `http://localhost:3000` by default.

### 3. Run Tests

To execute the test script and verify the API endpoints, ensure the server is running. Then, run the following command from the `node1` directory. Set `TEST_NODE_TOKEN` if the server is using a custom `NODE_TOKEN`.

```bash
# Set this if your server's NODE_TOKEN is not the default
# TEST_NODE_TOKEN="your_very_secure_and_unique_token" node test.js

# Or, if testing against the default token:
node test.js
```
The script will send requests to the running server and print "All tests passed!" if successful, or error messages if any test fails.

## API Endpoints

- `POST /mem/set`: Stores a key-value pair.
  - **Authentication**: Requires Bearer Token authentication.
  - **Header**: `Authorization: Bearer <your_NODE_TOKEN>`
  - **Request body (JSON)**: `{"k": "yourKey", "v": "yourValue"}`
  - **Success response (200 OK)**: `{ "message": "Value set successfully." }`
  - **Error response (400 Bad Request)**: If `k` or `v` are missing.
  - **Error response (401 Unauthorized)**: If the `Authorization` header is missing or the token is invalid.

- `GET /mem/get`: Retrieves a value by its key.
  - **Authentication**: None required.
  - **Query parameter**: `k=yourKey`
  - **Success response (200 OK)**: `{ "value": "yourValue" }`
  - **Error response (400 Bad Request)**: If `k` query parameter is missing.
  - **Error response (404 Not Found)**: `{ "message": "Key not found." }`
