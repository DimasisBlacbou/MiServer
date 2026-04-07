const nodeProcess = require("node:process");
try {
  nodeProcess.loadEnvFile();
} catch (e) {
  console.log(e);
}
const express = require("express");
const { otherRouter } = require("./other");
const { userRouter } = require("./user");
const { productRouter } = require("./product");
const { clientRouter } = require("./client");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", "./views");
app.use(cookieParser());

otherRouter(app);
userRouter(app);
productRouter(app);
clientRouter(app);

app.listen(process.env.PORT || 3000);
