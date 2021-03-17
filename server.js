require("dotenv").config();
require("./src/utils/logger");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const helmet = require("helmet");
const authJwt = require("./src/middleware/authJwt");
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

// ** Security
app.use(helmet());

// *Models
const db = require("./src/models");
const { sequelize } = require("./src/models");

// ? Routes
app.get("/api/checkToken", authJwt.verifyToken, (req, res) => {
  res.status(200).send({
    message: "Valid token",
  });
});
require("./src/routes/auth.routes")(app);
require("./src/routes/user.routes")(app);
require("./src/routes/platform.routes")(app);
require("./src/routes/game.routes")(app);
require("./src/routes/gamesMode.routes")(app);
require("./src/routes/tournament.routes")(app);

db.sequelize.sync({ force: false }).then(() => {
  console.info("Re-sync db.");
  app.listen(port, () => {
    console.info(`API run at http://localhost:${port}`);
  });
});
