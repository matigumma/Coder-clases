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
  async getProductsById(id) {
    const productSave = await this.getProducts();
    const foundId = productSave.find((product) => product.id === id);
    if (foundId === undefined) {
      console.log("Not Found");
    } else {
      return "producto encontrado", foundId;
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
        const indexToProductDelete = productSave.findIndex(
          (element) => element.id === id
        );
        if (indexToProductDelete === -1) {
          throw new Error("El id indicado no se encotro");
        } else {
          productSave.splice(indexToProductDelete, 1);
          console.log(productSave);
          await fs.promises.writeFile(this.path, JSON.stringify(productSave));
          return productSave;
        }
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
            productSave[i].id = id;
            productSave[i].title = elementModify.title;
            productSave[i].description = elementModify.description;
            productSave[i].price = elementModify.price;
            productSave[i].thumbnail = elementModify.thumbnail;
            productSave[i].code = elementModify.code;
            productSave[i].stock = elementModify.stock;
            break;
          }
        }
        await fs.promises.writeFile(this.path, JSON.stringify(productSave));
        return productSave;
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
  // const getProductsById = await manager.getProductsById(1);
  // const deleteProduct = await manager.deleteProduct(2);
  // const modifyProduct = await manager.modifyProduct(5, {
  //   title: "titulo modificado sin modificar el id",
  //   description: "descripcion modificada",
  //   price: 200,
  //   thumbnail: "URL image meodificada",
  //   code: 300,
  //   stock: 10,
  // });
  // const addProduct = await manager.addProduct(
  //   "Titulo5",
  //   "descripcion5",
  //   40,
  //   "URL image5",
  //   100,
  //   40
  // );
  // console.log(addProduct);
  // console.log(getProducts);
  // console.log(getProductsById);
  console.log(modifyProduct);
  // console.log(deleteProduct);
}

prueba();
