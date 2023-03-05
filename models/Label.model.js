const { DataTypes } = require('sequelize');
const { getDBConnection } = require('../services/database');

const sequelize = getDBConnection();

const Label = sequelize.define('labels', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    card_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    color: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    created_by: {
        type: DataTypes.UUID,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: 'modified_on'
});

module.exports = {
    Label
}