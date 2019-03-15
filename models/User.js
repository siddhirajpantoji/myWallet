// Considering model for User .
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('post', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: DataTypes.STRING,
        content: {
          type: DataTypes.TEXT,
          allowNull: false
        },
      },
      {
        freezeTableName: true,
      }
    );

  
    return User;
  } 
