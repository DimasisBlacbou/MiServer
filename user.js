const {
  registerAccount,
  loginAccount,
  checkdDuplicateAccount,
} = require("./data.js");

const jwt = require("jsonwebtoken");

const userRouter = (app) => {
  app.post("/register", async (req, res) => {
    let name = req.body.name;
    let mail = req.body.mail;
    let year = +req.body.year;
    let password = req.body.password;
    let user = {
      name,
      mail,
      year,
      password,
      cart: [],
    };
    const rezult = await checkdDuplicateAccount(mail);
    if (rezult == true) {
      res.redirect("/register?error=1");
      return;
    }
    await registerAccount(user);
    /*     res.status(200).json("ok"); */
    const token = jwt.sign({ mail: mail }, process.env.JWTSECRET);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000 * 24 * 5,
    });
    res.redirect("/catalog");
  });
  app.post("/login", async (req, res) => {
    let mail = req.body.mail;
    let password = req.body.password;
    let user = {
      mail,
      password,
    };
    const result = await loginAccount(user);
    if (result == true) {
      const token = jwt.sign({ mail: mail }, process.env.JWTSECRET);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000 * 24 * 5,
      });
      res.redirect("/catalog");
    } else {
      res.redirect("/login?error=1");
    }
  });
};
module.exports = { userRouter };
