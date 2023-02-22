const { DataTypes } = require('sequelize');
const {getDBConnection} = require('../services/database');
const sequelize = getDBConnection();

const Card = sequelize.define('cards',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    cover_photo_url: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    list_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    created_by: {
        type: DataTypes.UUID,
        allowNull: false
    },
    modified_by: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: 'modified_on'    
});
    
module.exports = {
    Card
}
