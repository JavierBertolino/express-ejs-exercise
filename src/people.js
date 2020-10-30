const { getAll } = require('./apiHandler');

async function getPeople(sortKey) {
    let peopleUrl = 'https://swapi.dev/api/people/';

    const response = await getAll(peopleUrl);

    return sortKey ? response.sort((a, b) => compareFunction(a, b, sortKey) ) : response;
}

function compareFunction(a, b, sortKey) {
    if (sortKey === "name") {
        console.log("sorting by name");
        return a[sortKey] > b[sortKey] ? 1 : -1;
    }
    else {
        return a[sortKey] - b[sortKey]
    }
}

module.exports = { getPeople };