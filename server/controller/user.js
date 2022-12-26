const { User, Asset } = require("../models/index");
class Controller {
  // GET ALL USERS
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

  // GET USER BY ID
  static async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const dataUser = await User.findOne({
        where: {
          id,
        },
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

  // CREATE USER
  static async createUser(req, res, next) {
    try {
      const { name, gender, parentId } = req.body;
      // catatan :
      // parentId disini harus dinamis, supaya bisa menentukan siapa orang tua nya
      // di front end harus find lagi semua user, untuk medapatkan id nya, agar dinamis

      const dataUser = await User.create({
        name,
        gender,
        parentId,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Create new User Successfully",
        data: dataUser,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE USER
  static async editUser(req, res, next) {
    try {
      const { id } = req.params;
      const { name, gender, parentId } = req.body;

      //validasi id user
      const data = await User.findByPk(id);
      if (!data) {
        throw { name: "Data User Not Found", id: id };
      }

      // disini juga sama, untuk parent id nya harus dinamis
      const dataUser = await User.update(
        {
          name,
          gender,
          parentId,
        },
        {
          where: { id },
        }
      );
      res.status(200).json({
        statusCode: 200,
        message: "Update User Successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE USER
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      //validasi id user
      const data = await User.findByPk(id);
      if (!data) {
        throw { name: "Data User Not Found", id: id };
      }

      const dataUser = await User.destroy({
        where: {
          id,
        },
      });

      console.log("dkwodk");

      res.status(200).json({
        statusCode: 200,
        message: "Delete User Successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
