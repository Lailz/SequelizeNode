const db = require("./db");
const { Op } = db.Sequelize;
const { Movie, Person } = db.models;

const chalk = require("chalk");

(async () => {
  //   await Movie.sync(); //this will sync this model only
  await db.sequelize.sync({ force: true }); //this will sync all your models
  //   sync() method accepts an object with a force parameter that lets you control the database synchronization.
  try {
    const movie1 = await Movie.create({
      title: "Hello",
      runtime: 115,
      releaseDate: "1995-11-22",
      isAvailableOnVHS: true
    });
    const movie2 = await Movie.create({
      title: "The Incredibles",
      runtime: 115,
      releaseDate: "2004-04-14",
      isAvailableOnVHS: true
    });
    const person1 = await Person.create({
      firstName: "Layal",
      lastName: "Amar"
    });
    const movie3 = await Movie.build({
      title: "Toy Story 3",
      runtime: 130,
      releaseDate: "2010-06-18",
      isAvailableOnVHS: false
    });
    movie3.title = movie3.title.toUpperCase();
    await movie3.save();

    const movieById = await Movie.findByPk(3);

    const movieByRuntimeAndTitle = await Movie.findOne({
      where: { runtime: 115, title: "Hello" }
    });

    const allMovies = await Movie.findAll();

    // SELECT * FROM Movie WHERE runTime = 115;
    const someMovies = await Movie.findAll({
      attributes: ["movieId", "title"],
      where: { isAvailableOnVHS: true }
    });

    const someOtherMovies = await Movie.findAll({
      where: {
        [Op.or]: {
          releaseDate: {
            [Op.gte]: "2004-04-14" //release date is greater than or equal to the passed date
          },
          runtime: { [Op.gt]: "100" }
        }
      },
      order: [["runtime", "DESC"], "movieId"] // order it by runtime in a descending order then by movieid (by default it will be ascending)
    });

    movieById.isAvailableOnVHS = true;
    await movieById.save();

    const movieById2 = await Movie.findByPk(2);
    await movieById2.update(
      {
        title: "Finding Dory",
        isAvailableOnVHS: false
      },
      { fields: ["isAvailableOnVHS"] }
    );

    // console.log(movieById.toJSON());
    // console.log(movieById2.get({ plain: true }));

    await movieById.destroy();

    console.log(await Movie.findAll().map(movie => movie.toJSON()));
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      const errors = err.errors.map(err => err.message);
      console.error("Validation errors: ", errors);
    } else {
      throw err;
    }
  }
})();
