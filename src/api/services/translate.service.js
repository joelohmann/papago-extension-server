import fetch from 'node-fetch';

// Constants
const API_URL = 'https://openapi.naver.com/v1/papago/n2mt';

const translate = async function(data) {
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Naver-Client-Id': process.env.CLIENT_ID,
            'X-Naver-Client-Secret': process.env.CLIENT_SECRET
        },
        body: data
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
};

module.exports = translate;
