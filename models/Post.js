const { DataTypes, Sequelize} = require("sequelize");
const database = require("../database/index");


const Post = database.define('Post', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        get() {
            return require('moment')(this.getDataValue('created_at')).format('DD-MM-YYYY');
        }
    }}, 
{
    tableName: 'post',
    timestamps: false,
    timezone: 'Europe/Rome'
})

Post.sync()


module.exports = Post

const Interactions = require("./Interactions")
const User = require("./User")

Post.belongsTo(User, {foreignKey:'userId'}) 
Post.hasMany(Interactions, { foreignKey: 'postId' });