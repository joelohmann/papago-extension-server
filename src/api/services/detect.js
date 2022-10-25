const fetch = require('node-fetch');

const logger = require('../../utils/logger.js');
const translate = require('./translate.js');

const DETECT_URL = 'https://openapi.naver.com/v1/papago/detectLangs';
const TRANSLATE_URL = 'https://openapi.naver.com/v1/papago/n2mt';

async function detect(body) {
    try {
        let detectBody = {
            "query": body.text
        }

        let response = await fetch(DETECT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Naver-Client-Id': process.env.CLIENT_ID,
                'X-Naver-Client-Secret': process.env.CLIENT_SECRET
            },
            body: JSON.stringify(detectBody)
        });
        let detectJSON = await response.json();
        let langCode = detectJSON.langCode;

        if (!response.ok) {
            logger.error(`Naver API detection call failed. Code ${response.status}`);

            let status = response.status;
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

        let {status, data} = await translate(transBody);

        return {status, data}
    } catch (err) {
        logger.error(err);

        let status = err.status;
        return {status, err};
    }
};

module.exports = detect;
