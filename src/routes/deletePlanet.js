const { Planet } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.delete('/api/planets/:id',auth, (req, res) => {
        Planet.findByPk(req.params.id).then(planet => {
            if(planet === null) {
                const message = `La planète demandée n'existe pas. Réessayez avec un autre identifiant.`;
                return res.status(404).json({message: message});
            } 

            const planetDeleted = planet;
            return Planet.destroy({
                where: { id: planet.id }
            })
            .then( _ => {
                const message = `La planète avec l'identifiant n°${planetDeleted.id} a bien été supprimée.`;
                res.json({message: message, data: planetDeleted});
            });
        })
        .catch(error => {
            const message = `La planète n'a pas pu être supprimée. Réessayer dans quelques instants`;
            res.status(500).json({message: message, data: error});
        });
    });
}