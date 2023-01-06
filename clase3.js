//DESAFIO DE LA CLASE 3
class ProductManager {
  constructor() {
    this.products = [];
  }
  getProducts() {
    return this.products;
  }
  getProductsById(idProduct) {
    const foundId = this.products.find((product) => product.id === idProduct);
    if (foundId === undefined) {
      console.log("Not Found");
    } else {
      console.log("producto encontrado", foundId);
    }
  }
  addProduct(title, description, price, thumbnail, code, stock) {
    const verificacion = this.#verificacionCode(code);
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Faltan rellenar campos");
    } else if (verificacion) {
      console.log("Codigo repetido, porfavor ingresar un nuevo codigo");
    } else {
      const product = {
        id: this.#idAutoIncremental(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(product);
    }
  }
  #idAutoIncremental() {
    let id = 1;
    if (this.products.length !== 0) {
      id = this.products[this.products.length - 1].id + 1;
    }
    return id;
  }
  #verificacionCode(codeProduct) {
    return this.products.some((prod) => prod.code === codeProduct);
  }
}

const manager1 = new ProductManager();
manager1.addProduct("Titulo1", "descripcion1", 20, "URL image1", 100, 40); // prducto agregado correctamnte
manager1.addProduct("Titulo2", "descripcion2", 20, "URL image2", 200, 30); // prducto agregado correctamnte
manager1.addProduct("Titulo3", "descripcion3", 30, "URL image3", 200, 10); // codigo repetido
manager1.addProduct("Titulo3", 10, "URL image4", 300, 15); // campos no completo (descripcion)
const getByID = manager1.getProductsById(1); // id valido
const getByIdNot = manager1.getProductsById(4); // id No encontrado
const getProucts = manager1.getProducts(); // devuelve los productos agregados

console.log(getProucts);
console.log(getByID);
console.log(getByIdNot);
