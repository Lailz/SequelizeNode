const Sequelize = require("sequelize");

module.exports = sequelize => {
  class Movie extends Sequelize.Model {}
  Movie.init(
    {
      movieId: {
        type: Sequelize.INTEGER,
        primaryKey: true, // this will instruct Sequelize to generate the primary key column using this property name
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          // notEmpty: true // to prevent a value from being an empty string
          notEmpty: {
            msg: "Please provide a value for title. Thank you!" // custom error message
          },
          notNull: {
            msg: "Please provide a value for title. Thank you!" // custom error message
          }
        }
      }, // default length of the string is 255
      runtime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: 1,
            msg:
              "Please provide a value greater than 0 for the runtime. Thank you!" // check if there is a default message
          },
          notEmpty: {
            msg: "Please provide a value for the runtime. Thank you!" // to prevent a value from being an empty string
          },
          notNull: {
            msg: "Please provide a value for the runtime. Thank you!"
          }
        }
      },
      releaseDate: {
        type: Sequelize.DATEONLY, // accepts a date provided in the format yyyy-mm-dd
        allowNull: false,
        validate: {
          isAfter: {
            args: "1895-12-27",
            msg: "Please provide a date that's after or on 1895-12-27"
          },
          notEmpty: {
            msg: "Please provide a value for the release date. Thank you!"
          },
          notNull: {
            msg: "Please provide a value for the release date. Thank you!"
          }
        }
      },
      isAvailableOnVHS: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      paranoid: true, // for soft deleting
      sequelize, // same as { sequelize: sequelize }
      timestamps: false
      // tableName: "myMoviesTable"
      // freezeTableName: true // disable plural table names
    }
  );
  return Movie;
};
