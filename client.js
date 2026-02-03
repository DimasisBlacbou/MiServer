const { getAccountByMail, getProducts } = require("./data.js");
const jwt = require("jsonwebtoken");
const clientRouter = (app) => {
  app.get("/login", (req, res) => {
    const error = req.query.error;
    res.render("login", { error });
  });

  app.get("/catalog", async (req, res) => {
    const token = req.cookies.token;
    try {
      const decoded = jwt.verify(token, process.env.JWTSECRET);
      const account = await getAccountByMail(decoded.mail);
      const products = await getProducts();
      res.render("catalog", { account, products });
    } catch (error) {
      res.redirect("/login");
    }
  });
  app.get("/clear", (req, res) => {
    res.clearCookie("token");
    console.log("Cookie cleared");
    res.redirect("/login");
  });
  app.get("/register", (req, res) => {
    const error = req.query.error;
    res.render("register", { error });
  });
  app.get("/cart", async (req, res) => {
    const token = req.cookies.token;
    try {
      const decoded = jwt.verify(token, process.env.JWTSECRET);
      const account = await getAccountByMail(decoded.mail);
      let localCart = account.cart;
      const products = await getProducts();
      localCart = localCart.map(
        (id) => products.filter((product) => product.id == id)[0]
      );
      res.render("cart", { localCart, account, products });
    } catch (error) {
      res.redirect("/login");
    }
  });
};
module.exports = { clientRouter };
