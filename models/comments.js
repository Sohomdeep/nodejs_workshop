'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Comments = sequelize.define('tbl_comments', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      //defaultValue: DataTypes.UUIDV4,
      autoIncrement: true,
      allowNull: false
    },
    /*post_id: {
      type: DataTypes.UUID,
      allowNull: false
    },*/
    content: {
      type: DataTypes.TEXT,
      required: true
    },
    commenter_username: {
      type: DataTypes.STRING,
      required: true
    },
    commenter_email: {
      type: DataTypes.STRING,
      required: true
    },
    status: {
      type: DataTypes.ENUM,
      values: ['approved', 'rejected', 'in review']

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

  Comments.associate = function(models) {
    Comments.belongsTo(models.tbl_posts, {
      post_id : {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      }
    });
  }

  return Comments;
};