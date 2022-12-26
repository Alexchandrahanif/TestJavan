const router = require("express").Router();

const assetRouter = require("./asset");
const userRouter = require("./user");

router.use("/user", userRouter);
router.use("/asset", assetRouter);

module.exports = router;
