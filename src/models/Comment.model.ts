import { DataTypes, TextLength } from 'sequelize'
import {getDBConnection} from '../services/database.js';


const sequelize = getDBConnection();

export const Comment = sequelize.define('comments',{
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
    content: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: 'modified_on'
});