const express = require('express');
const morgan = require('morgan'); 
const favicon = require('serve-favicon');
const sequelize = require('./src/db/sequelize');

const app = express();
const port = 3000;


app.use(favicon(`${__dirname}/favicon.ico`))
   .use(morgan('dev'))
   .use(express.json());

sequelize.initDb();
// Ici, nous placerons nos futurs points de terminaison.
require('./src/routes/findAllPlanets')(app); 
require('./src/routes/findPlanetByPk')(app);
require('./src/routes/createPlanet')(app);
require('./src/routes/updatePlanet')(app);
require('./src/routes/deletePlanet')(app);

app.use(({res}) => {
   const message = `Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.`;
   res.status(404).json({message: message});
});

app.listen( port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`));
