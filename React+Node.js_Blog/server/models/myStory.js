const { DataTypes } = require('sequelize');

const Model = (sequelize) => {
    const story = sequelize.define(
        'story',
        {
            id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title : {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            story : {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "story",
            timestamps: false,
        }
    );

    return {
        story,
    };

};

module.exports = Model;