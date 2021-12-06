const fetch = require('node-fetch');

const API_URL = 'https://openapi.naver.com/v1/papago/detectLangs';

async function detect(data) {
    let response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Naver-Client-Id': process.env.CLIENT_ID,
            'X-Naver-Client-Secret': process.env.CLIENT_SECRET
        },
        body: data
    });
    let body = await response.json();
    return body;
};

module.exports = detect;
