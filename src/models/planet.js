module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Planets', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        detail: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        distance: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duree: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    });
}