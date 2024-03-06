const { DataTypes, Sequelize } = require("sequelize");
const database = require("../database/index");
const Post = require('./Post')

const Interactions = database.define('Interactions', {
    like: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true
    },
    timetable: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        get() {
            return require('moment')(this.getDataValue('timetable')).format('DD-MM-YYYY');
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'interactions',
    timestamps: false
})

Interactions.sync()
Interactions.belongsTo(Post, {foreignKey:'postId'})

module.exports = Interactions