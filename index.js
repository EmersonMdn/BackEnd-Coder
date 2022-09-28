const fs = require("fs");
// const express = require("express");
// const app = express();

class Product {
  constructor(file) {
    this.file = file;
  }
  //crear producto
  async newProduct(objProduct) {
    const data = await fs.promises.readFile(
      `${this.file}/products.json`,
      "utf-8"
    );
    const products = JSON.parse(data);
    const id = products.length + 1;

    objProduct.id = id;
    objProduct.likes = [];

    products.push(objProduct);
    const productsString = JSON.stringify(products);
    await fs.promises.writeFile(
      `${this.file}/products.json`,
      productsString,
      "utf-8"
    );
    return products;
  }

  //obtener productos
  async getAllProducts() {
    const data = await fs.promises.readFile(
      `${this.file}/products.json`,
      "utf-8"
    );
    return JSON.parse(data);
  }

  //obtener productos por ID
  async getProductsById(id) {
    const data = await fs.promises.readFile(
      `${this.file}/products.json`,
      "utf-8"
    );
    const products = JSON.parse(data);
    const findProduct = products.find((item) => item.id == id);

    return findProduct ? findProduct : "Product not found";
  }

  //obtener likes de usuarios
  async getLikesById(id) {
    const data = await fs.promises.readFile(
      `${this.file}/products.json`,
      "utf-8"
    );
    const products = JSON.parse(data);
  }

  //Dar like
  async likeProduct(productId, pageId) {
    // obtener productos
    const data = await this.getAllProducts();

    //filtar productos
    const newData = data.map((product) => {
      if (product.id == productId) {
        return product.likes.push(pageId);
      }
      return product;
    });

    //guardar a la lista
    const dataString = JSON.stringify(newData);
    await fs.promises.writeFile(
      `${this.file}/products.json`,
      dataString,
      "utf8"
    );
    return newData;
  }
  async createPage(pageObj) {
    const data = await fs.promises.readFile(`${this.file}/pages.json`, "utf-8");
    const pages = JSON.parse(data);

    //generate id
    const id = pages.length + 1;
    pageObj.id = id;

    //add new page
    pages.push(pageObj);
    // console.log(pages);
    const pagesString = JSON.stringify(pages);
    await fs.promises.writeFile(
      `${this.file}/pages.json`,
      pagesString,
      "utf-8"
    );

    return pages;
  }
  async getAllPages() {
    try {
      const data = await fs.promises.readFile(
        `${this.file}/pages.json`,
        "utf-8"
      );
      const pages = JSON.parse(data);
      return pages;
    } catch (err) {
      return [];
    }
  }
}

async function start() {
  const db = new Product("data");
  const products = await db.newProduct({
    title: "Pizza peperoni",
    price: 132,
    thumbnail: "www.examples.com/products/jabon",
  });

}

start();
