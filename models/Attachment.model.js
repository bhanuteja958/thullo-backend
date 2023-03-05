const { DataTypes } = require('sequelize');
const { getDBConnection } = require('../services/database');

const sequelize = getDBConnection();

const Attachment = sequelize.define('attachments', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    card_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    attachment_url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: 'modified_on'
});

module.exports = {
    Attachment
}