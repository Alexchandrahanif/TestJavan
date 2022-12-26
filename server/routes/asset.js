const Controller = require("../controller/asset");

const assetRouter = require("express").Router();

assetRouter.get("/", Controller.getAssets);
assetRouter.get("/:id", Controller.getAsset);
module.exports = assetRouter;
