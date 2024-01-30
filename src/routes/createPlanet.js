const { Planet } = require('../db/sequelize');

module.exports = (app) => {
    app.post('/api/planets', (req, res) => {
        Planet.create(req.body)
            .then(planet => {
                const message = `La planète ${req.body.name} a bien été crée.`;
                res.json({message: message, data: planet});
            })
            .catch(error => {
                const message = `La planète n'a pas pu être ajoutée. Réessayez dans quelques instants.`;
                res.status(500).json({message: message, data: error});
            });
    });
}