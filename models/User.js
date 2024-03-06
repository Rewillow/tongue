const { DataTypes } = require("sequelize");
const database = require("../database/index");


const User = database.define('User', {
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'user',
    timestamps: false
});

module.exports = User;

const Post = require("./Post")
User.hasMany(Post, {foreignKey:'userId'})
