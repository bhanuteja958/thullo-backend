const { DataTypes } = require("sequelize");
const { getDBConnection } = require("../services/database");
const { Board } = require("./Board.model");
const { User } = require("./User.model");

const sequelize = getDBConnection();

const BoardUserMapping = sequelize.define('board_user_mapping', {
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

module.exports = {
    BoardUserMapping
}