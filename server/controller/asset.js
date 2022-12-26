const { User, Asset } = require("../models/index");

class Controller {
  // GET ALL ASSETS
  static async getAssets(req, res, next) {
    try {
      const dataAsset = await Asset.findAll({
        include: User,
      });
      res.status(200).json({
        statusCode: 200,
        data: dataAsset,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ASSET BY ID
  static async getAsset(req, res, next) {
    try {
      const { id } = req.params;
      const dataAsset = await Asset.findOne({
        where: {
          id,
        },
        include: User,
      });

      res.status(200).json({
        statusCode: 200,
        data: dataAsset,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
