const { DataTypes } = require('sequelize');
const {getDBConnection} = require('../services/database');
const { Card } = require('./Card.model');
const { User } = require('./User.model');
const sequelize = getDBConnection();

const CardUserMapping = sequelize.define('card_user_mapping', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    card_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    created_by: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_on",
    updatedAt: false
});

Card.belongsToMany(User, {through: CardUserMapping, foreignKey: 'card_id', uniqueKey: 'id'});
User.belongsToMany(Card, {through: CardUserMapping, foreignKey: 'user_id', uniqueKey: 'id'});

module.exports = {
    CardUserMapping
}