/*
    OTC Tracker Project
    
    User table js for sequelize
     
    Chandler Dibble, Al Curry  
    March 23, 2018 

*/
const bcrypt = require("bcrypt-nodejs");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  User.prototype.validPassword = function(password) {
     return bcrypt.compareSync(password, this.password);
  }
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};


