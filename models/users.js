'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Users = sequelize.define('tbl_users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
     // defaultValue: DataTypes.UUIDV4,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      required: true
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin', 'disabled']

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

  Users.associate = function(models) {
    Users.hasMany(models.tbl_posts);
  }

  return Users;
};