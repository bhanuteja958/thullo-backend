import { DataTypes } from 'sequelize'
import {getDBConnection} from '../services/database.js';


const sequelize = getDBConnection();

export const Label = sequelize.define('labels', {
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