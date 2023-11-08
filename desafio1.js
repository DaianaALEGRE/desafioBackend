const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.nextProductId = 1;
    this.loadProducts(); // Carga los productos desde el archivo al crear una instancia.
  }

  // Método para agregar un producto.
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
  // Método para obtener todos los productos.
  getProducts() {
    return this.products;
  }

  // Método para obtener un producto por su ID.
  getById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.log("Error: Producto no encontrado");
    }
    return product;
  }

  // Método para eliminar un producto por su ID.
  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      console.log("Error: Producto no encontrado");
      return;
    }

    this.products.splice(index, 1);
    this.saveProducts(); // Guarda los productos actualizados en el archivo.
    console.log("Producto eliminado con éxito.");
  }

  // Método para actualizar un producto por su ID.
  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      console.log("Error: Producto no encontrado");
      return;
    }

    const productToUpdate = this.products[productIndex];

    // Actualiza los campos especificados (sin borrar el 'id').
    Object.assign(productToUpdate, updatedFields);

    this.products[productIndex] = productToUpdate;
    this.saveProducts(); // Guarda los productos actualizados en el archivo.
    console.log("Producto actualizado con éxito.");
  }

  // Método para cargar productos desde un archivo.
  loadProducts() {
    try {
      const data = fs.readFileSync('products.json', 'utf8');
      this.products = JSON.parse(data);
      if (this.products.length > 0) {
        this.nextProductId = Math.max(...this.products.map((p) => p.id)) + 1;
      }
    } catch (error) {
      // Si hay un error al leer el archivo, se asume que no hay datos y se continúa con productos vacíos.
      console.log("No se pudo cargar el archivo de productos. Iniciando con lista vacía.");
      this.products = [];
    }
  }

  // Método para guardar productos en un archivo.
  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync('products.json', data, 'utf8');
  }
}

const manager = new ProductManager();

// Agregar productos de ejemplo.
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

// Obtener un producto por ID.
const productById = manager.getById(1);
console.log(productById);

// Eliminar un producto por ID.
manager.deleteProduct(1);
console.log("Producto eliminado");

// Actualizar un producto por ID.
manager.updateProduct(2, {
  title: 'Nuevo título',
  price: 50,
});
console.log("Producto actualizado");

// Obtener el producto actualizado.
const updatedProduct = manager.getById(2);
console.log(updatedProduct);

// Obtener la lista de todos los productos.
const allProducts = manager.getProducts();
console.log("Lista de productos:");
console.log(allProducts);
