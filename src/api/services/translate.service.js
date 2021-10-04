const $ = require('jquery');

// Constants
const API_URL = 'https://openapi.naver.com/v1/papago/n2mt';

const translate = function(data) {
    $.ajax({
        url: API_URL,
        headers: {
            'Content-Type': 'application/json',
            'X-Naver-Client-Id': process.env.CLIENT_ID,
            'X-Naver-Client-Secret': process.env.CLIENT_SECRET
        },
        method: 'POST',
        body: data
    })
    .done((res) => res.json())
    .fail((err) => console.log(err))
}

// Abandoning fetch...
// const translate = function(data) {
//     fetch(API_URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-Naver-Client-Id': process.env.CLIENT_ID,
//             'X-Naver-Client-Secret': process.env.CLIENT_SECRET
//         },
//         body: data
//     }).then(res => {
//         return res.json()
//     }).catch(err => {
//         console.log(err)
//     })
// };

module.exports = translate;
