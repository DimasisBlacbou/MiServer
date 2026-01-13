const { getAccountByMail, getProducts } = require("./data.js");
const jwt = require("jsonwebtoken");
const clientRouter = (app) => {
  app.get("/login", (req, res) => {
    const error = req.query.error;
    res.render("login", { error });
  });

  app.get("/catalog", async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    const account = await getAccountByMail(decoded.mail);
    const products = await getProducts();
    res.render("catalog", { account, products });
  });
  app.get("/register", (req, res) => {
    const error = req.query.error;
    res.render("register", { error });
  });
};
module.exports = { clientRouter };
