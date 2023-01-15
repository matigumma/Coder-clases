const fs = require("fs");
const path = "./Products.json";

class ProductManager {
  async getProducts() {
    try {
      if (fs.existsSync(path)) {
        const products = await fs.promises.readFile(path, "utf-8");
        const productsParse = JSON.parse(products);
        return productsParse;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Faltan rellenar campos");
      } else {
        const productSave = await this.getProducts();
        const product = {
          id: this.#idAutoIncremental(),
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        productSave.push(product);
        await fs.promises.writeFile(path, JSON.stringify(productSave));
      }
    } catch (error) {
      console.log(error);
    }
  }
  async #idAutoIncremental() {
    let id = 1;
    const productSave = await this.getProducts();
    if (productSave.length !== 0) {
      id = productSave[productSave.length - 1].id + 1;
    }
    return id;
  }
}
const manager = new ProductManager();

async function prueba() {
  const getProducts = await manager.getProducts();
    const addProduct = await manager.addProduct(
      "Titulo1",
      "descripcion1",
      20,
      "URL image1",
      100,
      40
    );
    console.log(addProduct)
  console.log(getProducts);
}

prueba();
