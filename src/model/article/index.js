const { DataTypes } = require('sequelize')
const sequelize = require("../../config/db"),
    UserModel = require('../user')

const Article = sequelize.define('Article', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contenu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // dateCreate: {
    //     type: DataTypes.DATE, 
    //     allowNull: false,
    //     defaultValue: DataTypes.NOW 
    // },
    // dateUpdate: {
    //     type: DataTypes.DATE,
    //     allowNull: true, 
    //     defaultValue: null 
    // },
    isEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    }
}, {timestamps: true})

// Article.beforeUpdate((article, options) => {
//     article.dateUpdate = new Date(); // Mise à jour de la dateUpdate uniquement lors de la mise à jour de l'article
// });

Article.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'article_belongsTo_user',
    // The possible choices are RESTRICT, CASCADE, NO ACTION, SET DEFAULT and SET NULL
    // onDelete: "RESTRICT",  Default is SET NULL
    // onUpdate: "RESTRICT",     Default is CASCADE
})
UserModel.hasMany(Article, {
    foreignKey: 'userId',
    as: 'user_hasMany_articles'
})
//Product.sync({ force: true })
// update User table if exist without delete
// await Product.sync({ alter: true });
// drop and create User table
// await Product.sync({ force: true });
// create User table if not exist
module.exports = Article
