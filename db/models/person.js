const Sequelize = require("sequelize");

module.exports = sequelize => {
  class Person extends Sequelize.Model {}
  Person.init(
    {
      firstName: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please provide a first name"
          },
          notNull: {
            args: true,
            msg: "Please provide a first name"
          }
        }
      },
      lastName: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please provide a last name"
          },
          notNull: {
            args: true,
            msg: "Please provide a last name"
          }
        }
      }
    },
    { sequelize }
  );
  return Person;
};
