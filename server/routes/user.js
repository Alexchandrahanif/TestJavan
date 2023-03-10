const Controller = require("../controller/user");

const userRouter = require("express").Router();

userRouter.get("/", Controller.getUSers);
userRouter.get("/:id", Controller.getUser);
userRouter.post("/", Controller.createUser);
userRouter.put("/:id", Controller.editUser);
userRouter.delete("/:id", Controller.deleteUser);

module.exports = userRouter;
