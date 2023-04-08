import { DataTypes } from 'sequelize'
import {getDBConnection} from '../services/database.js';
import { Board } from './Board.model.js';
import { User } from './User.model.js';

const sequelize = getDBConnection();

export const BoardUserMapping = sequelize.define('board_user_mapping', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    board_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'added_on',
    updatedAt: false
});

Board.belongsToMany(User, {through: BoardUserMapping, foreignKey: 'board_id', uniqueKey: 'id'});
User.belongsToMany(Board, {through: BoardUserMapping, foreignKey: 'user_id', uniqueKey: 'id'});
