const express = require('express');
const morgan = require('morgan'); 
const favicon = require('serve-favicon');
const { Sequelize } = require('sequelize');
const { success, getUniqueId } = require('./helper.js');
let planets = require('./mock-planets');

const app = express();
const port = 3000;

const sequelize = new Sequelize(
    'spacetourismAPI',
    'root',
    '',
    {
       host: 'localhost',
       dialect: 'mariadb',
       dialectOptions: {
           timezone: 'Etc/GMT-2'
       },
       logging: false
    }
   );
   
   sequelize.authenticate()
       .then( _ => console.log(`La connexion à la base de données a bien été établie.`))
       .catch( error => console.log(`Impossible de se connecter à la base de données : ${error}.`));

app.use(favicon(`${__dirname}/favicon.ico`))
   .use(morgan('dev'))
   .use(express.json());


app.get('/', (req, res) => res.send(`Hello again, Express !`));

// Début des moficiations
app.get('/api/planets', (req, res) => {
    const message = 'La liste des planets a bien été récupérée.';
    res.json(success(message, planets));
});
// Fin des modifications

app.get('/api/planets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const planet = planets.find(planet => planet.id === id);
    const message = `Une planète a bien été trouvée.`;
    res.json(success(message, planet));
});

app.post('/api/planets', (req, res) => {
    const id = getUniqueId(planets);
    const planetCreated = { ...req.body, ...{ id: id, created: new Date() }};
    planets.push(planetCreated);
    const message = `Le pokémon ${planetCreated.name} a bien été crée.`;
    res.json(success(message, planetCreated));
});

app.put('/api/planets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const planetUpdated = { ...req.body, id: id };
    planets = planets.map( planet => {
        return planet.id === id ? planetUpdated : planet;
    });
    const message = `La planète ${planetUpdated.name} a bien été modifiée.`;
    res.json(success(message, planetUpdated));
});

app.delete('/api/planets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const planetDeleted = planets.find(planet => planet.id === id);
    planets = planets.filter(planet => planet.id !== id);
    const message = `La planète ${planetDeleted.name} a bien été supprimée.`;
    res.json(success(message, planetDeleted));
});


app.listen( port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`));
