const express = require("express");
const handleError = require("./middleware/handeError");
const router = require("./routes");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use(handleError);

app.listen(port, () => {
  console.log(`semoga bisa maksimal, amin`);
});
