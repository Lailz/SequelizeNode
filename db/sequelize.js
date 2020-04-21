const Sequelize = require("sequelize");

sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "movies.db",
  logging: false
  //   define: {
  //     freezeTableName: true,
  //     timestamps: false
  //   } Global options
});

modules.export = sequelize;
