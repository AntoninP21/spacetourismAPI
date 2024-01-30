const { Sequelize, DataTypes } = require('sequelize');
const PlanetModel = require('../models/planet');
const planets = require('./mock-planets');

const sequelize = new Sequelize('spacetourismAPI', 'root', '', {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: true
    });

sequelize.authenticate()
.then(_ => console.log('La connection à la BDD a bien été établie.'))
.catch(error => console.error(`Impossible de se connecter à la BDD : ${error}`));

const Planet = PlanetModel(sequelize, DataTypes);

const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
        planets.map(planet => {
            Planet.create({
                name: planet.name,
                detail: planet.detail,
                distance: planet.distance,
                duree: planet.duree,
                image: planet.image
            }).then(planet => console.log(planet.toJSON()));
        });
        console.log('La base de donnée a bien été initialisée.')
    });
}

module.exports = {
    initDb, Planet
}