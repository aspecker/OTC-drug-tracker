/*
    OTC Tracker Project
    
    Med table sequelize js
     
    Chandler Dibble, Al Curry  
    March 23, 2018 

*/
module.exports = (sequelize, DataTypes) => {
  const Med = sequelize.define("Med", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    fdaMedId: {
      type: DataTypes.INT,
      allowNull: false
    }
  });
  return Med;
};
