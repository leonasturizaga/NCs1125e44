require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require("pg");

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_DATABASE
} = process.env;

const sequelize = new Sequelize(
  `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DATABASE}`,
  {
    dialect: "postgres",
    dialectModule: pg,
    logging: false,
  }
);

// importar modelos
require("./models/userModel")(sequelize);
require("./models/testimonyModel")(sequelize);
require("./models/categoryModel")(sequelize);
require("./models/imageModel")(sequelize);
require("./models/videoTestimonyModel")(sequelize);

// relaciones
const { user, testimony, category, image, videoTestimony } = sequelize.models;

user.hasMany(videoTestimony);
videoTestimony.belongsTo(user);

module.exports = { sequelize, ...sequelize.models };
