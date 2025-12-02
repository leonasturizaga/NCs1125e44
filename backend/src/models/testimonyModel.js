const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("testimony", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    youtubeUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { is: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
    },
  });
};
