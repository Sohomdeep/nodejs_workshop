"use strict";

module.exports = function(sequelize, DataTypes) {
  var Img = sequelize.define("tbl_images", {
    name: DataTypes.STRING,
    status:DataTypes.INTEGER,
  });

  Img.associate = function(models) {
    Img.belongsTo(models.tbl_customers);
  }
  
  return Img;
};