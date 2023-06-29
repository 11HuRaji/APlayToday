const { Router } = require("express");
const PlayController = require("../controllers/play");

const playRouter = Router();

playRouter.get('/', PlayController.getAllPlays);

module.exports = playRouter;
