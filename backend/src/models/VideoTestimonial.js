
// backend/src/models/VideoTestimonial.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('VideoTestimonial', {
    title: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT }
  }, {
    tableName: 'VideoTestimonials',
    timestamps: true
  });
};

