const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

// Use TEST_NODE_TOKEN or default to the same default as in app.js
const TEST_TOKEN = process.env.TEST_NODE_TOKEN || "DEFAULT_SECURE_TOKEN_REPLACE_ME";

async function runTests() {
  let allTestsPassed = true;

  // Test Case 1: Set a value (with valid token)
  try {
    const setResponse = await fetch(`${BASE_URL}/mem/set`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TEST_TOKEN}`,
      },
      body: JSON.stringify({ k: 'testKey', v: 'testValue' }),
    });
    if (setResponse.status !== 200) {
      console.error(`Test Case 1 Failed (Set value with valid token): Expected status 200, got ${setResponse.status}`);
      allTestsPassed = false;
    } else {
      const setData = await setResponse.json();
      if (setData.message !== 'Value set successfully.') {
        console.error(`Test Case 1 Failed (Set value with valid token): Expected success message, got "${setData.message}"`);
        allTestsPassed = false;
      } else {
        console.log('Test Case 1 Passed: Set value (with valid token)');
      }
    }
  } catch (error) {
    console.error('Test Case 1 Failed (Set value with valid token) with error:', error);
    allTestsPassed = false;
  }

  // Test Case 2: Get the set value (should still work, as /mem/get is unprotected)
  try {
    const getResponse = await fetch(`${BASE_URL}/mem/get?k=testKey`);
    if (getResponse.status !== 200) {
      console.error(`Test Case 2 Failed (Get value): Expected status 200, got ${getResponse.status}`);
      allTestsPassed = false;
    } else {
      const getData = await getResponse.json();
      // Ensure this reflects the value set in Test Case 1
      if (getData.value !== 'testValue') {
        console.error(`Test Case 2 Failed (Get value): Expected value "testValue", got "${getData.value}"`);
        allTestsPassed = false;
      } else {
        console.log('Test Case 2 Passed: Get value');
      }
    }
  } catch (error) {
    console.error('Test Case 2 Failed (Get value) with error:', error);
    allTestsPassed = false;
  }

  // Test Case 3: Get a non-existent value (should still work)
  try {
    const getNonExistentResponse = await fetch(`${BASE_URL}/mem/get?k=nonExistentKey`);
    if (getNonExistentResponse.status !== 404) {
      console.error(`Test Case 3 Failed (Get non-existent value): Expected status 404, got ${getNonExistentResponse.status}`);
      allTestsPassed = false;
    } else {
      const getData = await getNonExistentResponse.json();
      if (getData.message !== 'Key not found.') {
         console.error(`Test Case 3 Failed (Get non-existent value): Expected "Key not found." message, got "${getData.message}"`);
         allTestsPassed = false;
      } else {
        console.log('Test Case 3 Passed: Get non-existent value');
      }
    }
  } catch (error) {
    console.error('Test Case 3 Failed (Get non-existent value) with error:', error);
    allTestsPassed = false;
  }

  // Test Case 4: Attempt to set a value with an invalid token
  try {
    const setInvalidTokenResponse = await fetch(`${BASE_URL}/mem/set`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer INVALID_TOKEN',
      },
      body: JSON.stringify({ k: 'anotherKey', v: 'anotherValue' }),
    });
    if (setInvalidTokenResponse.status !== 401) {
      console.error(`Test Case 4 Failed (Set value with invalid token): Expected status 401, got ${setInvalidTokenResponse.status}`);
      allTestsPassed = false;
    } else {
      const errorData = await setInvalidTokenResponse.json();
      if (errorData.message !== 'Unauthorized: Invalid token.') {
        console.error(`Test Case 4 Failed (Set value with invalid token): Expected "Unauthorized: Invalid token." message, got "${errorData.message}"`);
        allTestsPassed = false;
      } else {
        console.log('Test Case 4 Passed: Set value with invalid token');
      }
    }
  } catch (error) {
    console.error('Test Case 4 Failed (Set value with invalid token) with error:', error);
    allTestsPassed = false;
  }

  // Test Case 5: Attempt to set a value with no token
  try {
    const setNoTokenResponse = await fetch(`${BASE_URL}/mem/set`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ k: 'yetAnotherKey', v: 'yetAnotherValue' }),
    });
    if (setNoTokenResponse.status !== 401) {
      console.error(`Test Case 5 Failed (Set value with no token): Expected status 401, got ${setNoTokenResponse.status}`);
      allTestsPassed = false;
    } else {
      const errorData = await setNoTokenResponse.json();
      if (errorData.message !== 'Unauthorized: Authorization header missing.') {
        console.error(`Test Case 5 Failed (Set value with no token): Expected "Unauthorized: Authorization header missing." message, got "${errorData.message}"`);
        allTestsPassed = false;
      } else {
        console.log('Test Case 5 Passed: Set value with no token');
      }
    }
  } catch (error) {
    console.error('Test Case 5 Failed (Set value with no token) with error:', error);
    allTestsPassed = false;
  }

  if (allTestsPassed) {
    console.log('All tests passed!');
  } else {
    console.error('Some tests failed.');
    process.exit(1);
  }
}

runTests();
