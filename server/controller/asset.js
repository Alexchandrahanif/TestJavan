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

  // DECREMENT COUNT ASSET
  static async decrementAsset(req, res, next) {
    try {
      const { id } = req.params;
      const dataAsset = await Asset.findByPk(id);

      //Validasi Id
      if (!dataAsset) {
        throw { name: "Data Asset Not Found", id: id };
      }

      console.log(dataAsset.count, "jumlah");
      // Validasi supaya jumlah tidak kurang dari 1
      if (dataAsset.count <= 1) {
        throw { name: "Invalid" };
      }

      // Decrement
      await dataAsset.decrement({
        count: 1,
      });

      res.status(200).json({
        statusCode: 200,
        message: "Success decrement data Asset",
      });
    } catch (error) {
      next(error);
    }
  }

  // INCREMENT COUNT ASSET
  static async incrementAsset(req, res, next) {
    try {
      const { id } = req.params;
      const dataAsset = await Asset.findByPk(id);

      // Validasi Id
      if (!dataAsset) {
        throw { name: "Data Asset Not Found", id: id };
      }

      // Increment
      await dataAsset.increment({
        count: 1,
      });

      res.status(200).json({
        statusCode: 200,
        message: "Success increment data Asset",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // UPDATE COUNT BY ID AND REQ.BODY
  static async updateCount(req, res, next) {
    // ini untuk merubah count dari asset menggunakan req.body
    try {
      const { id } = req.params;
      const { count } = req.body;

      // Validasi
      const data = await Asset.findByPk(id);
      if (!data) {
        throw { name: "Data Asset Not Found", id: id };
      }

      const dataAsset = await Asset.update(
        {
          count: count,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Success update count asset",
      });
    } catch (error) {
      next(error);
    }
  }

  // Count Price Asset
  static async countPrice(req, res, next) {
    try {
      const id = req.params.UserId;

      // Validasi User ada atau tidak
      const dataUser = await User.findByPk(id);

      if (!dataUser) {
        throw { name: "Data User Not Found", id: id };
      }
      // mendapatkan asset berdasarkan user / asset-assetn yg dimiliki user
      const data = await Asset.findAll({
        where: {
          UserId: id,
        },
      });

      // logic untuk menghitung total price
      let totalPrice = 0;
      data.forEach((el) => {
        let temp = el.price * el.count;
        totalPrice += temp;
      });

      res.status(200).json({
        statusCode: 200,
        data: data,
        totalPrice: totalPrice,
      });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}
module.exports = Controller;
