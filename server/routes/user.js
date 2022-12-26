const Controller = require("../controller/user");

const userRouter = require("express").Router();

userRouter.get("/", Controller.getUSers);
userRouter.get("/:id", Controller.getUser);

module.exports = userRouter;
