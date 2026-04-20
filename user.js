const {
  getAccountByMail,
  registerAccount,
  loginAccount,
  checkdDuplicateAccount,
} = require("./data.js");
const bcrypt = require("bcrypt");
const { sendRegisterEmail } = require("./mail.js");
const jwt = require("jsonwebtoken");
const { Admin } = require("mongodb");
const saltRounds = 10;

const userRouter = (app) => {
  app.post("/register", async (req, res) => {
    let name = req.body.name;
    let mail = req.body.mail;
    let year = +req.body.year;
    let password = req.body.password;
    let hash = await bcrypt.hash(password, saltRounds);
    let user = {
      name,
      mail,
      year,
      password: hash,
      cart: [],
      admin: false,
    };
    const rezult = await checkdDuplicateAccount(mail);
    if (rezult == true) {
      res.redirect("/register?error=1");
      return;
    }
    await sendRegisterEmail(mail);
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

    const account = await getAccountByMail(mail);
    const result = await bcrypt.compare(password, account.password);
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
