import { DataTypes } from 'sequelize'
import {getDBConnection} from '../services/database.js';
import { Board } from './Board.model.js';

const sequelize = getDBConnection();

export const User = sequelize.define('Users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true  
    },
    password: {
        type:  DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    is_verified: {
        type: DataTypes.TINYINT({
            length: 1
        }),
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: 'modified_on',
    freezeTableName: true
});

User.hasMany(Board, {
    foreignKey: {
        name: 'created_by',
    },
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT'
});
