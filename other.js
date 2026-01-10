const otherRouter = (app) => {
  app.get("/numbers", (req, res) => {
    const randomNumber = Math.floor(Math.random() * 1000);
    res.json({ number: randomNumber });
  });
  app.get("/time", (req, res) => {
    const date = new Date();
    res.json({ date });
  });
  app.get("/sum", (req, res) => {
    const a = +req.query.a;
    const b = +req.query.b;
    const sum = a + b;
    res.json(sum);
  });
  app.get("/dice", (req, res) => {
    const n = +req.query.n;
    const randomNumber = Math.floor(Math.random() * n + 1);
    const randomNumber2 = Math.floor(Math.random() * n + 1);
    const randomNumber3 = Math.floor(Math.random() * n + 1);
    res.json([randomNumber, randomNumber2, randomNumber3]);
  });
};
module.exports = { otherRouter };
