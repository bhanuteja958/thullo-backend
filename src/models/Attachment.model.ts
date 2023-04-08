import { DataTypes } from 'sequelize'

import {getDBConnection} from '../services/database.js';

const sequelize = getDBConnection();

export const Attachment = sequelize.define('attachments', {
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