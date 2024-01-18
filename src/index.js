// Import the style file
import './style.css';

// Get the element with the id of app
const app = document.getElementById('app');

// Create a heading element
const heading = document.createElement('h1');
// Set the text content of the heading element
heading.textContent = 'Hello, GitHub CI/CD!';
// Append the heading element to the app element
app.appendChild(heading);
