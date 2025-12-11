import { DataTypes } from "sequelize";

export default function initVideoTestimonyModel(sequelize) {
  sequelize.define("videoTestimony", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    videoType: {
      type: DataTypes.ENUM("upload", "youtube"),
      allowNull: false
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING
    }
  });
}
