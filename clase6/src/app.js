import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
var manager = new ProductManager("Products.json");

// devuelve el producto por limit por las querys
app.get("/products", async (req, res) => { // este endpoint devuelve un arreglo [productos]
  const { limit } = req.query;

  try {
    const productSave = await manager.getProducts();

    const productosLimit = productSave.slice(0, limit);

    res.status(200).send(productosLimit);

  } catch (error) {
    console.log(error);
    res.status(500).send("fallo al leer los productos");
  }
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params; // params son strings'

  try {
    const getProductsById = await manager.getProductsById(parseInt(pid));

    if (getProductsById === null) {
      res.status(404).send("Producto no encontrado");
    }

    res.status(200).send(getProductsById);// {}

  } catch (error) {
    console.log(error);
    res.status(500).send("Fallo de servidor");
  }
});


app.listen(3001, () => {
  console.log("Server escuchando en el puerto", 3001);
});
