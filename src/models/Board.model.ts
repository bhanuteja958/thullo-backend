import { DataTypes, EnumDataType } from 'sequelize'
import {getDBConnection} from '../services/database.js';
import { List } from './List.model.js';

const sequelize = getDBConnection();

export const Board = sequelize.define('Boards',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    cover_photo_url: {
        type:DataTypes.TEXT,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    visibility: {
        type: DataTypes.ENUM({
            values: ['public', 'private']
        }),
        allowNull: false,
        defaultValue: 'private'
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

Board.hasMany(List, {
    foreignKey: {
        name: 'board_id',
    },
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
});