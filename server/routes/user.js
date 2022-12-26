const Controller = require("../controller/user");

const userRouter = require("express").Router();

userRouter.get("/", Controller.getUSers);

module.exports = userRouter;
