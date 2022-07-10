const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Comment, {
        onDelete: 'CASCADE',
        foreignKey: 'tea_id',
      });
    }
  }
  Tea.init({
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    location: DataTypes.TEXT,
    img: DataTypes.TEXT,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Tea',
  });
  return Tea;
};
