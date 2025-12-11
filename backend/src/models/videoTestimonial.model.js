module.exports = (sequelize) => {
  sequelize.define("videoTestimonial", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    youtubeId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    tableName: "videoTestimonials",
    timestamps: true
  });
};
