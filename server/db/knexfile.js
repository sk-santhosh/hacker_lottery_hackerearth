const path = require("path");
const _ = require("lodash");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

module.exports = {
  client: "mysql",
  connection: {
    host: process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_DB,
  },
  migrations: {
    tableName: "migrations",
    directory: path.join(__dirname, "migrations"),
  },
  seeds: {
    directory: path.join(__dirname, "seeds"),
  },
  wrapIdentifier: (value, origImpl) => origImpl(_.snakeCase(value)),
};
