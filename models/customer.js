"use strict";

module.exports = function(sequelize, DataTypes) {
  var Cust = sequelize.define("tbl_customers", {
    name: DataTypes.STRING,
    address:DataTypes.STRING,
    mobile:DataTypes.INTEGER,
    email:DataTypes.STRING,
    image:DataTypes.STRING,
    has_image:DataTypes.INTEGER
    
  });

  Cust.associate = function(models) {
    Cust.hasMany(models.tbl_images);
  }
  
  return Cust;
};