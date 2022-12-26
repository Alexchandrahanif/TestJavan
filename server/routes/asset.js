const Controller = require("../controller/asset");

const assetRouter = require("express").Router();

assetRouter.get("/", Controller.getAssets);
assetRouter.get("/:id", Controller.getAsset);
assetRouter.post("/", Controller.createAsset);
assetRouter.patch("/:id", Controller.editAsset);
assetRouter.patch("/increment/:id", Controller.incrementAsset);
assetRouter.patch("/decrement/:id", Controller.decrementAsset);
assetRouter.patch("/count/:id", Controller.updateCount);
module.exports = assetRouter;
