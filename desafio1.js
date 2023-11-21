const fs = require('fs').promises;

class ProductManager {
  constructor() {
    this.products = [];
    this.nextProductId = 1;
    this.loadProducts(); 
  }

  addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;
  
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Error: Todos los campos son obligatorios.");
      return;
    }
  
    if (this.products.some((p) => p.code === code)) {
      console.log("Error: Ya existe un producto con el mismo código.");
      return;
    }
  
    const newProduct = {
      id: this.nextProductId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
  
    this.nextProductId++;
    this.products.push(newProduct);
    this.saveProducts();
    console.log("Producto agregado con éxito.");
  }

  getProducts() {
    return this.products;
  }

  getById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.log("Error: Producto no encontrado");
    }
    return product;
  }
  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      console.log("Error: Producto no encontrado");
      return;
    }

    this.products.splice(index, 1);
    this.saveProducts(); 
    console.log("Producto eliminado con éxito.");
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      console.log("Error: Producto no encontrado");
      return;
    }

    const productToUpdate = this.products[productIndex];

    Object.assign(productToUpdate, updatedFields);

    this.products[productIndex] = productToUpdate;
    this.saveProducts(); 
    console.log("Producto actualizado con éxito.");
  }

  async loadProducts() {
    try {
      const data = await fs.readFile('products.json', 'utf8');
      this.products = JSON.parse(data);
      if (this.products.length > 0) {
        this.nextProductId = Math.max(...this.products.map((p) => p.id)) + 1;
      }
      console.log("Productos cargados con éxito.");
    } catch (error) {
      
      console.log("No se pudo cargar el archivo de productos. Iniciando con lista vacía.");
      this.products = [];
    }
  }


  async saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    try {
      await fs.writeFile('products.json', data, 'utf8');
      console.log("Productos guardados con éxito.");
    } catch (error) {
      console.log("Error al guardar productos:", error.message);
    }
  }
}

const manager = new ProductManager();

manager.addProduct({
  title: 'Producto prueba 1',
  description: 'esto es un producto de prueba',
  price: 10,
  thumbnail: 'sin imagen',
  code: "a555",
  stock: 5,
});

manager.addProduct({
  title: 'Producto prueba 2',
  description: 'esto es un producto de prueba',
  price: 10,
  thumbnail: 'sin imagen',
  code: "a556",
  stock: 12,
});

const productById = manager.getById(1);
console.log(productById);

manager.deleteProduct(1);
console.log("Producto eliminado");

manager.updateProduct(2, {
  title: 'Nuevo título',
  price: 50,
});
console.log("Producto actualizado");

const updatedProduct = manager.getById(2);
console.log(updatedProduct);

const allProducts = manager.getProducts();
console.log("Lista de productos:");
console.log(allProducts);
