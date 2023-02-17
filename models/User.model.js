const { DataTypes} = require("sequelize");
const { getDBConnection } = require("../services/database");

const sequelize = getDBConnection();

const User = sequelize.define('Users', {
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
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: 'modified_on',
    freezeTableName: true
})

module.exports = {
    User
}
