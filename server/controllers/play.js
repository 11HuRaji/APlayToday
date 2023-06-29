const Play = require("../models/play");

class PlayController {
  static async getAllPlays(req, res) {
    try {
      const data = await Play.getAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ Error: error });
    }
  }
}

module.exports = PlayController;
