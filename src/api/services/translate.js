const fetch = require('node-fetch');
const logger = require('../../utils/logger');

const API_URL = 'https://openapi.naver.com/v1/papago/n2mt';

async function translate(body) {
    try {
        let response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Naver-Client-Id': process.env.CLIENT_ID,
                'X-Naver-Client-Secret': process.env.CLIENT_SECRET
            },
            body: JSON.stringify(body)
        });
        let status = response.status;
        let responseJSON = await response.json();
        let data = responseJSON.message.result;

        return {status, data};
    } catch (err) {
        logger.error(err);
        
        let status = err.status;
        return {status, err};
    }
};

module.exports = translate;
