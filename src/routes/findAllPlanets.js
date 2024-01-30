const { Planet } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/planets', (req, res) => {
        Planet.findAll()
            .then(planet => {
                const message = 'La liste des planètes a bien été récupérée.';
                res.json({message: message, data: planet});
            })
            .catch(error => {
                const message = `La liste des planètes n'a pas pu être récupérée. Réesssayez dans quelques instants.`;
                res.status(500).json({message: message, data: error});
            });
    });
}