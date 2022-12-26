const { User, Asset } = require("../models/index");
class Controller {
  static async getUSers(req, res, next) {
    console.log("okey");
    try {
      const dataUser = await User.findAll({
        include: Asset,
      });
      res.status(200).json({
        statusCode: 200,
        data: dataUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
