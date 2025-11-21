const { Sequelize } = require("sequelize");
require("dotenv").config();
const pg = require("pg");

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, POSTGRES_USER, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_DATABASE } = process.env;

const sequelize = new Sequelize(
  `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DATABASE}?sslmode=require`,
  { logging: false, dialect: "postgres", dialectModule: pg }
);

const UserModel = require("./models/userModel")(sequelize);
const TestimonyModel = require("./models/testimonyModel")(sequelize);
const CategoryModel = require("./models/categoryModel")(sequelize);

const { user, testimony, category } = sequelize.models;

user.hasMany(testimony);
testimony.belongsTo(user);

testimony.belongsToMany(category, { through: "petition_category" });
category.belongsToMany(testimony, { through: "petition_category" });

module.exports = {
  user,
  testimony,
  category,
  conn: sequelize,
};
