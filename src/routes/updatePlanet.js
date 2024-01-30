const { Planet } = require('../db/sequelize');

module.exports = (app) => {
    app.put('/api/planets/:id', (req, res) => {
        const id = req.params.id;
        Planet.update(req.body, {
            where: { id: id }
        })
        .then( _ => {
            return Planet.findByPk(id).then(planet => {
                if(planet === null) {
                    const message = `La planète demandée n'existe pas. Réessayez avec un autre identifiant.`;
                    return res.status(404).json({message});
                }
                const message = `La planète ${planet.name} a bien modifiée.`;
                res.json({message: message, data: planet});
            });
        })
        .catch(error => {
            const message = `la planète n'a pas pu être modifiée. Réesayez dans quelques instants.`;
            res.status(500).json({message: message, data: error});
        });
    });
}