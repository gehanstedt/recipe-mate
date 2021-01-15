// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Favorite_recipe = sequelize.define("Favorite_recipe", {
    // This is the ID of the user from user.id
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    // Title of recipe from the website
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    // The password cannot be null
    url: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  });
/*
  Favorite_recipe.associate = function (models) {
    models.Favorite_recipe.belongsTo (models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })
  }
*/

  return Favorite_recipe;
};
