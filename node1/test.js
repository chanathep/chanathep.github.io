const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  let allTestsPassed = true;

  // Test Case 1: Set a value
  try {
    const setResponse = await fetch(`${BASE_URL}/mem/set`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ k: 'testKey', v: 'testValue' }),
    });
    if (setResponse.status !== 200) {
      console.error(`Test Case 1 Failed: Expected status 200, got ${setResponse.status}`);
      allTestsPassed = false;
    } else {
      const setData = await setResponse.json();
      if (setData.message !== 'Value set successfully.') {
        console.error(`Test Case 1 Failed: Expected success message, got ${setData.message}`);
        allTestsPassed = false;
      } else {
        console.log('Test Case 1 Passed: Set value');
      }
    }
  } catch (error) {
    console.error('Test Case 1 Failed with error:', error);
    allTestsPassed = false;
  }

  // Test Case 2: Get the set value
  try {
    const getResponse = await fetch(`${BASE_URL}/mem/get?k=testKey`);
    if (getResponse.status !== 200) {
      console.error(`Test Case 2 Failed: Expected status 200, got ${getResponse.status}`);
      allTestsPassed = false;
    } else {
      const getData = await getResponse.json();
      if (getData.value !== 'testValue') {
        console.error(`Test Case 2 Failed: Expected value "testValue", got "${getData.value}"`);
        allTestsPassed = false;
      } else {
        console.log('Test Case 2 Passed: Get set value');
      }
    }
  } catch (error) {
    console.error('Test Case 2 Failed with error:', error);
    allTestsPassed = false;
  }

  // Test Case 3: Get a non-existent value
  try {
    const getNonExistentResponse = await fetch(`${BASE_URL}/mem/get?k=nonExistentKey`);
    if (getNonExistentResponse.status !== 404) {
      console.error(`Test Case 3 Failed: Expected status 404, got ${getNonExistentResponse.status}`);
      allTestsPassed = false;
    } else {
      const getData = await getNonExistentResponse.json();
      if (getData.message !== 'Key not found.') {
         console.error(`Test Case 3 Failed: Expected "Key not found." message, got "${getData.message}"`);
         allTestsPassed = false;
      } else {
        console.log('Test Case 3 Passed: Get non-existent value');
      }
    }
  } catch (error) {
    console.error('Test Case 3 Failed with error:', error);
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
