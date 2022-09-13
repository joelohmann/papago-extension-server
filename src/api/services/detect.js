const fetch = require('node-fetch');
const logger = require('../../utils/logger');

const DETECT_URL = 'https://openapi.naver.com/v1/papago/detectLangs';
const TRANSLATE_URL = 'https://openapi.naver.com/v1/papago/n2mt';

async function detect(body) {
    try {
        let detectBody = {
            "query": body.text
        }

        let detectResponse = await fetch(DETECT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Naver-Client-Id': process.env.CLIENT_ID,
                'X-Naver-Client-Secret': process.env.CLIENT_SECRET
            },
            body: JSON.stringify(detectBody)
        });
        let detectJSON = await detectResponse.json();
        let langCode = detectJSON.langCode;

        if (!detectResponse.ok) {
            logger.error("Naver API call failed");

            let status = detectResponse.status;
            let data = detectJSON;
            return {status, data}
        }

        if (langCode == body.target) {
            body.target = langCode != 'en' ? 'en' : 'ko';
        }

        let transBody = {
            'source': langCode,
            'target': body.target,
            'text': body.text,
            'honorific': body.honorific
        }

        let transResponse = await fetch(TRANSLATE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Naver-Client-Id': process.env.CLIENT_ID,
                'X-Naver-Client-Secret': process.env.CLIENT_SECRET
            },
            body: JSON.stringify(transBody)
        });

        if (!transResponse.ok) {
            logger.error("Naver API call failed");
        }

        let status = transResponse.status;
        let data = await transResponse.json();

        return {status, data}
    } catch (err) {
        logger.error(err);

        let status = err.status;
        return {status, err};
    }
};

module.exports = detect;
