const { DataTypes} = require("sequelize");
const { getDBConnection } = require("../services/database");
const { Card } = require("./Card.model");

const sequelize = getDBConnection();

const List = sequelize.define('lists', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    board_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.UUID,
        allowNull: false,
    }
}, {
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: 'modified_on'   
});

List.hasMany(Card, {
    foreignKey: {
        name: 'list_id'
    },
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
});

Card.belongsTo(List, {foreignKey: 'list_id'});

module.exports = {
    List
}