const Controller = require("../controller/user");

const userRouter = require("express").Router();

userRouter.get("/", Controller.getUSers);
userRouter.get("/:id", Controller.getUser);
userRouter.post("/", Controller.createUser);

module.exports = userRouter;
