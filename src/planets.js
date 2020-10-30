const { getAll, requestData, getPage } = require('./apiHandler');


async function getPlanets() {
    let planetsUrl = 'https://swapi.dev/api/planets/';

    const planets = await getAll(planetsUrl);
    const parsedPlanets = Promise.all(planets.map(async planet => await replaceResidents(planet)));
    return parsedPlanets;
}

async function replaceResidents(planet) {
    let residentsNames = [];

    for (residentUrl of planet.residents) {
        const resident = await requestData(residentUrl)
        residentsNames.push(resident.name);        
    }
        
    planet.residents = residentsNames;
    return planet;
}

module.exports = { getPlanets };