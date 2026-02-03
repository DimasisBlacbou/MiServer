const fs = require("fs");
const jwt = require("jsonwebtoken");
const {
  addCart,
  removeProduct,
  addProduct,
  editProduct,
  getProducts,
} = require("./data.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/data/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension);
  },
});
const upload = multer({ storage: storage });

const { v4: uuidv4 } = require("uuid");

const productRouter = (app) => {
  app.get("/products", async (req, res) => {
    const products = await getProducts();
    res.status(200).json(products);
  });
  app.post("/products", upload.single("image"), async (req, res) => {
    console.log(req.file, req.body);

    if (req.body.name == undefined) {
      res
        .status(400)
        .json({ result: "error", error: "не правильный ввод 'Name'" });
      return;
    }
    if (req.body.price == undefined) {
      res
        .status(400)
        .json({ result: "error", error: "не правильный ввод 'Prise'" });
      return;
    }
    if (req.body.inStock == undefined) {
      res
        .status(400)
        .json({ result: "error", error: "не правильный ввод 'inStock'" });
      return;
    }
    if (req.body.description == undefined) {
      res
        .status(400)
        .json({ result: "error", error: "не правильный ввод 'Description'" });
      return;
    }
    if (req.file == undefined) {
      res
        .status(400)
        .json({ result: "error", error: "не правильный ввод 'Image'" });
      return;
    }
    if (req.body.weight == undefined) {
      res
        .status(400)
        .json({ result: "error", error: "не правильный ввод 'Weight'" });
      return;
    }
    if (req.body.flavor == undefined) {
      res
        .status(400)
        .json({ result: "error", error: "не правильный ввод 'Flavor'" });

      return;
    }

    const id = uuidv4();
    const name = req.body.name;
    const price = +req.body.price;
    const inStock = req.body.inStock;
    const description = req.body.description;
    const image = "data/" + req.file.filename;
    const weight = req.body.weight;
    const flavor = req.body.flavor;
    const product = {
      id,
      name,
      price,
      inStock,
      description,
      image,
      weight,
      flavor,
    };
    const _ = await addProduct(product);
    res.status(200).json({ result: "ok" });
  });
  app.post("/productsChange", upload.single("image"), async (req, res) => {
    console.log(req.body);
    if (req.body.id == undefined) {
      res
        .status(400)
        .json({ result: "error", error: "не правильный ввод 'ID'" });
      return;
    }
    const id = req.body.id;
    const product = {};

    const Check = ["name", "price", "inStock", "weight", "flavor"];
    for (const field of Check) {
      if (
        field in req.body &&
        (req.body[field] === "" || req.body[field] == null)
      ) {
        res.status(400).json({
          result: "error",
          error: `Поле '${field}' не должно быть пустым.`,
        });
        return;
      }
    }
    console.log(product);
    if (req.body.name != undefined) {
      product.name = req.body.name;
    }
    if (req.body.price != undefined) {
      product.price = +req.body.price;
    }
    if (req.body.inStock != undefined) {
      product.inStock = req.body.inStock;
    }
    if (req.body.description != undefined) {
      product.description = req.body.description;
    }
    if (req.file != undefined) {
      product.image = "data/" + req.file.filename;
    }
    if (req.body.weight != undefined) {
      product.weight = req.body.weight;
    }
    if (req.body.flavor != undefined) {
      product.flavor = req.body.flavor;
    }
    res.status(200).json({ result: "ok" });
    await editProduct(id, product);
  });
  app.delete("/products", async (req, res) => {
    if (req.query.id == undefined) {
      res
        .status(400)
        .json({ result: "error", error: "не правильный ввод 'ID'" });
      return;
    }
    const id = req.query.id;
    const _ = await removeProduct(id);
    res.status(200).json({ result: "ok" });
  });
  app.post("/cart", async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    const mail = decoded.mail;
    const id = req.query.id;
    await addCart(mail, id);
    res.status(200).json({ result: "ok" });
  });
};
module.exports = { productRouter };
