
const request = require('request')

async function requestData(url) {
    return await new Promise((resolve, reject) => {
        request(url, { json: true }, (err, res, body) => {
            if (err)
                reject(err);
            resolve(body);
        });
    })
}


async function getAll(url) {
    let response = [];
    let items = [];

    do {
        if (response && response.next) {
            url = response.next;
        }

        response = await requestData(url);
        items = [...items, response.results];

    } while (response.next)

    return items.flat();
}

module.exports = {
    getAll,
    requestData
};