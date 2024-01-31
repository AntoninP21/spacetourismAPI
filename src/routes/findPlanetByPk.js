const { Planet } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.get('/api/planets/:id',auth, (req, res) => {
        Planet.findByPk(req.params.id)
            .then(planet => {
                if(planet === null) {
                    const message = `La planète demandée n'existe pas. Réessayez avec un autre identifiant.`;
                    return res.status(404).json({message: message});
                }
                const message = 'Une planète a bien été trouvée.';
                res.json({message: message, data: planet});
            })
            .catch(error => {
                const message = `La planète n'a pas pu être récupérée. Réessayer dans quelques instants`;
                res.status(500).json({message: message, data: error});
            });
    });
}