const express = require("express");
const app = express();
const db = require("./index.js");
const handlebars = require("express-handlebars");
const DB = new db("data");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use("views", "./views");
const hbs = handlebars.engine({
  extname: "hbs",
  layoutsDir: "./views/layouts/",
});
app.engine("hbs", hbs);

app.set("view engine", "hbs");

app.get("/add", (req, res) => {
  res.render("main", { layout: "newProduct" });
});

app.get("/products", async (req, res) => {
  const data = await DB.getAllProducts();
  res.render("main", { layout: "myProducts", items: data });
});

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await DB.getProductsById(id);
    res.render("main", { layout: "product", ...product });
  } catch (e) {
    res.status(404).render("main", { layout: "error"});
  }
});

app.get("/api/", async (req, res) => {
  const data = await DB.getAllProducts();
  res.send(data);
});

app.get("/api/product", async (req, res) => {
  const { id } = req.query;
  try {
    const data = await DB.getProductsById(id);

    return res.send(data);
  } catch (err) {
    return res.status(404).send(err.message);
  }
});

app.post("/api/product", async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const newData = await DB.newProduct({ title, price, thumbnail });
  return res.redirect("/add");
  // retunr res.send({ msg: "Usuario creado", data: newData });
});

app.listen(8080, () => {
  console.log("listening on port");
});
