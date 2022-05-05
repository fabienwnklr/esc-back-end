const db = require("../models");
const { Sequelize } = require("../models");
const Game = db.game;
const GameMode = db.gameMode;
const Platform = db.platform;
const { Op } = require("sequelize");

exports.create = async (req, res) => {
    try {
        const newGame = {
            name: req.body.name,
            imgUrl: req.body.imgUrl,
            createdBy: req.body.createdBy
      };
      const platformsAvalaible = req.body.platformsAvalaible;

        if (!newGame.name || !newGame.createdBy || !platformsAvalaible) {
            res.status(400).json({
                message: 'Please fill in all the fields'
            });
            return;
        }

        const gameCreated = await Game.create(newGame);
        const platforms = await Platform.findAll({
            where: {
                id: platformsAvalaible
            }
        });

      await gameCreated.addPlatforms(platforms);
      
      const result = await Game.findOne({
          where: { id: gameCreated.dataValues.id },
          include: [
              {
                  model: Platform,
                  as: 'platforms',
                  attributes: ['name', 'id']
              }
          ]
      });

      res.status(200).send({
          message: 'Game created successfully !',
          values: result
      });
    } catch (error) {
        if (error instanceof db.Sequelize.UniqueConstraintError) {
            return res.send({
                errorThrow: error,
                message: 'This game already exist.'
            })
        }
        console.error(error)
  }

};

exports.findAll = (req, res) => {
  Game.findAll({
    include: [{ model: Platform, as: "platforms", attributes: ['id', 'name'] }],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        errorThrow: err.message,
        message: "An error occured during retrieving data",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Game.findByPk(id, {
    include: [
      {
        model: GameMode,
        as: "gamesMode",
        attributes: ["name", "id"],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        errorThrow: err,
        message: `An error occured when retrieving game data for id = ${id}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const values = req.body;

  Game.update(values, {
    where: { id: id },
  })
    .then((num) => {
      console.log(num);
      if (num) {
        res.status(200).send({
          values,
          message: "Saved change(s)",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        errorThrow: err,
        message: `An error occured during the modification(s)`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Game.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Game removed",
        });
      } else {
        res.send({
          message: `Could not delete Game with id = ${id}, maybe already removed`,
        });
      }
    })
    .catch((err) => {
      res.status(401).send({
        errorThrow: err,
        message: `Could not delete Game with id = ${id}`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Game.destroy({
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch((err) => {
      res.status(401).send({
        errorThrow: err,
        message: "Some error occurred while removing all tutorials.",
      });
    });
};
