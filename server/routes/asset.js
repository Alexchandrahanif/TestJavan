const Controller = require("../controller/asset");

const assetRouter = require("express").Router();

assetRouter.get("/", Controller.getAssets);
assetRouter.get("/:id", Controller.getAsset);
assetRouter.post("/", Controller.createAsset);
module.exports = assetRouter;
