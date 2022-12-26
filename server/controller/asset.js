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

  // CREATE ASSET
  static async createAsset(req, res, next) {
    try {
      const { name, price, UserId } = req.body;
      // untuk UserId juga harus dinamis
      // Apabila menambahkan asset dilakukan oleh super admin, maka bisa di find dlu user nya
      // Apabila menambahkan asset dilakukan oleh user sendiri, maka UserId bisa di ambil dari req.user dari token Atau JWT

      const dataAsset = await Asset.create({
        name,
        price,
        UserId,
      });
      res.status(201).json({
        statusCode: 201,
        data: dataAsset,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
