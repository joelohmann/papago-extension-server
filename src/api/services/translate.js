const fetch = require('node-fetch');

const logger = require('../../utils/logger');

const NAVER_API_URL = 'https://openapi.naver.com/v1/papago/n2mt';
const NCLOUD_API_URL = 'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation';

async function translate(app, body) {
    // If the quota is exceeded, switch to using NCLOUD API and credentials.
    let url = app.get('quota exceeded') ? NCLOUD_API_URL : NAVER_API_URL;
    let headers = app.get('quota exceeded') ? {
        'Content-Type': 'application/json',
        'X-NCP-APIGW-API-KEY-ID': process.env.KEY_ID,
        'X-NCP-APIGW-API-KEY': process.env.KEY
    } : {
        'Content-Type': 'application/json',
        'X-Naver-Client-Id': process.env.CLIENT_ID,
        'X-Naver-Client-Secret': process.env.CLIENT_SECRET
    };

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            if (response.status === 429) {
                app.enable('quota exceeded');

                logger.info("Quota exceeded, switching to NCLOUD API.");

                return translate(app, body);
            }

            logger.error(`Naver API translation call failed. Code ${response.status}`);
        }

        let status = response.status;
        let data = await response.json();
        return {status, data};
    } catch (err) {
        logger.error(err);
        
        let status = err.status;
        return {status, err};
    }
};

module.exports = translate;
