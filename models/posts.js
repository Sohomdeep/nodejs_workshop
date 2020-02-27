'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Posts = sequelize.define('tbl_posts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      //defaultValue: DataTypes.UUIDV4,
      autoIncrement: true,
      allowNull: false
    },
    /*user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },*/
    content: {
      type: DataTypes.TEXT,
      required: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at:  DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    underscored: true
  });

  Posts.associate = function(models) {
    Posts.belongsTo(models.tbl_users, {
      user_id : {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
    }
    });
  }

  Posts.associate = function(models) {
    Posts.hasMany(models.tbl_comments);
  }

  return Posts;
};