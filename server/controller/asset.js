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

      if (!dataAsset) {
        throw { name: "Data Asset Not Found", id: id };
      }

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

  // EDIT ASSET
  static async editAsset(req, res, next) {
    try {
      const { id } = req.params;
      const { name, price, UserId } = req.body;

      // untuk update asset sendiri, ada kemungkinan terjadi
      // 1. UserId nya tidak di update, atau UserId didapatkan dari req.user dari token, ketika login, ketika User itu sendiri yg melakukan update
      // 2. UserId di input, ketika kepemilikan Asset juga hendak ditukar, biasanya dilakukan oleh super admin

      // Validasi
      const data = await Asset.findByPk(id);
      if (!data) {
        throw { name: "Data Asset Not Found", id: id };
      }

      const dataAsset = await Asset.update(
        {
          name,
          price,
          UserId,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: `Update Data Asset Successfully`,
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE ASSET
  static async deleteAsset(req, res, next) {
    try {
      const { id } = req.params;

      // Validasi
      const data = await Asset.findByPk(id);
      if (!data) {
        throw { name: "Data Asset Not Found", id: id };
      }

      const dataAsset = await Asset.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Delete Asset Successfullly",
      });
    } catch (error) {
      next(err);
    }
  }
}
module.exports = Controller;
