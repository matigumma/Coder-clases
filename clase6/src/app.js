import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
var manager = new ProductManager("Products.json");

// devuelve el producto por limit por las querys
app.get("/products", async (req, res) => {
  try {
    const productSave = await manager.getProducts();
    if (productSave === null) {
      res.status(404).send("No hay productos");
    } else {
      const { limit } = req.query;
      const productosLimit = productSave.slice(0, limit);
      res.status(200).send(productosLimit);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const getProductsById = await manager.getProductsById(parseInt(pid));
    if (getProductsById === null) {
      res.status(404).send("Producto no encontrado");
    } else {
      res.status(200).send(getProductsById);
    }
  } catch (error) {
    console.log(error);
  }
});
app.listen(3001, () => {
  console.log("Server escuchando en el puerto", 3001);
});
