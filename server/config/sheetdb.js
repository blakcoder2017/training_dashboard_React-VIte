const axios = require('axios');

const sheetdb = axios.create({
    baseURL: process.env.SHEETDB_API_URL,
    headers: {
      'Authorization': `Bearer ${process.env.SHEETDB_TOKEN}`,
      'Content-Type': 'application/json'
    },
});

module.exports = sheetdb;