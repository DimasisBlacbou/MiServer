const { getAccountByMail } = require("./data.js");
const jwt = require("jsonwebtoken");
const clientRouter = (app) => {
  app.get("/login", (req, res) => {
    const error = req.query.error;
    res.render("login", { error });
  });

  app.get("/catalog", async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "FFS-sdzx-sWSz-asd");
    const account = await getAccountByMail(decoded.mail);
    res.render("catalog", { account });
  });
  app.get("/register", (req, res) => {
    res.render("register", {});
  });
};
module.exports = { clientRouter };
