const { MongoClient } = require("mongodb");
const url = process.env.URLMDB;
const client = new MongoClient(url);
const dbName = "Sport-shop";
let accountsCollection = null;
let productsCollection = null;

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  productsCollection = db.collection("Products");
  accountsCollection = db.collection("Accounts");
  return "done.";
}

main().then(console.log).catch(console.error);
async function getAccountByMail(mail) {
  const findResult = await accountsCollection.find({ mail }).toArray();
  //  console.log("Found documents =>", findResult);
  return findResult[0];
}
async function getProducts() {
  const findResult = await productsCollection.find({}).toArray();
  // console.log("Found documents =>", findResult);
  return findResult;
}
async function addProduct(product) {
  const insertResult = await productsCollection.insertOne(product);
  // console.log("Inserted documents =>", insertResult);
}
async function editProduct(id, product) {
  const updateResult = await productsCollection.updateOne(
    { id },
    { $set: product }
  );
  // console.log("Updated documents =>", updateResult);
}
async function removeProduct(id) {
  const deleteResult = await productsCollection.deleteMany({ id });
  // console.log("Deleted documents =>", deleteResult);
}
async function registerAccount(user) {
  const userResult = await accountsCollection.insertOne(user);
  // console.log("Inserted documents =>", userResult);
}
async function loginAccount(user) {
  const userResult = await accountsCollection.find(user).toArray();
  if (userResult.length == 1) {
    return true;
  } else return false;
}
async function checkdDuplicateAccount(mail) {
  const userResult = await accountsCollection.find({ mail }).toArray();
  if (userResult.length == 1) {
    return true;
  } else return false;
}
async function addCart(mail, id) {
  const result = await accountsCollection.updateOne(
    { mail },
    {
      $push: {
        cart: id,
      },
    }
  );
}
async function removeCart(mail, id) {
  const account = await accountsCollection.findOne({ mail });
  if (account && account.cart) {
    const index = account.cart.indexOf(id);
    if (index !== -1) {
      account.cart.splice(index, 1);
      await accountsCollection.updateOne(
        { mail },
        { $set: { cart: account.cart } }
      );
    }
  }
}
module.exports = {
  addCart,
  checkdDuplicateAccount,
  loginAccount,
  removeProduct,
  editProduct,
  addProduct,
  getProducts,
  registerAccount,
  getAccountByMail,
  removeCart,
};
