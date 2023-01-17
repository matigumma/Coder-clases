const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
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
      const productSave = await this.getProducts();
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Faltan rellenar campos");
      } else {
        const product = {
          id: await this.#idAutoIncremental(),
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        productSave.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(productSave));
        return productSave;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProduct(id) {
    try {
      if (!id) {
        console.log("Indica el id del producto a eliminar");
      } else {
        const productSave = await this.getProducts();
        productSave.splice(id, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(productSave));
        return productSave;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async modifyProduct(id, elementModify) {
    try {
      const productSave = await this.getProducts();
      if (!id || !elementModify) {
        console.log("Faltan rellenar campos");
      } else {
        let indexToRemove = id;

        for (let i = 0; i < productSave.length; i++) {
          if (productSave[i].id === indexToRemove) {
            productSave[i].title = elementModify.title;
            break;
          }
        }
        console.log("FILTRADOOO", productSave);
        // productSave.splice(id, 1, elementModify);
        // await fs.promises.writeFile(this.path, JSON.stringify(productSave));
        // return productSave;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async #idAutoIncremental() {
    let id = 1;
    try {
      const productsParse = await this.getProducts();
      if (productsParse.length !== 0) {
        id = productsParse[productsParse.length - 1].id + 1;
      }

      return id;
    } catch (error) {
      console.log(error);
    }
  }
}
const manager = new ProductManager("Products.json");

async function prueba() {
  // const getProducts = await manager.getProducts();

  // const deleteProduct = await manager.deleteProduct(2);

  const modifyProduct = await manager.modifyProduct(3, {
    id: 3,
    title: "elemento modificado as",
    description: "descripcion1",
    price: 20,
    thumbnail: "URL image1",
    code: 300,
    stock: 1,
  });

  // const addProduct = await manager.addProduct(
  //   "Titulo1",
  //   "descripcion1",
  //   20,
  //   "URL image1",
  //   100,
  //   40
  // );

  // console.log(addProduct);

  // console.log(getProducts);

  console.log(modifyProduct);

  // console.log(deleteProduct);
}

prueba();
