const axios = require('axios');

// The URL of your deployed backend service on Render
const serviceUrl = process.env.SERVICE_URL;

if (!serviceUrl) {
    console.error('Error: SERVICE_URL environment variable is not set.');
    console.error('Please set this to the URL of your deployed backend service.');
    process.exit(1);
}

const keepAwake = async () => {
    try {
        const response = await axios.get(serviceUrl);
        console.log(`Successfully pinged ${serviceUrl}. Status: ${response.status}. Body: "${response.data}"`);
    } catch (error) {
        console.error(`Error pinging ${serviceUrl}:`, error.message);
    }
};

console.log(`Starting keep-awake script for ${serviceUrl}...`);
keepAwake();