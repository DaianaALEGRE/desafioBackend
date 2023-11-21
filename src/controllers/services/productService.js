// productService.js
const fs = require('fs').promises;
const Product = require('../models/productModel');
const fileUtils = require('../utils/fileUtils');

// Ruta al archivo de productos
const PRODUCTS_FILE_PATH = 'products.json';

class ProductService {
  constructor() {
    this.products = [];
    this.nextProductId = 1;
    this.loadProducts();
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error('Todos los campos son obligatorios.');
    }

    if (this.products.some((p) => p.code === code)) {
      throw new Error('Ya existe un producto con el mismo código.');
    }

    const newProduct = new Product(
      this.nextProductId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );

    this.nextProductId++;
    this.products.push(newProduct);
    this.saveProducts();
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error('Producto no encontrado.');
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado.');
    }

    const productToUpdate = this.products[productIndex];

    Object.assign(productToUpdate, updatedFields);

    this.products[productIndex] = productToUpdate;
    this.saveProducts();
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado.');
    }

    this.products.splice(index, 1);
    this.saveProducts();
  }

  async loadProducts() {
    try {
      const data = await fileUtils.readFile(PRODUCTS_FILE_PATH);
      this.products = JSON.parse(data);
      if (this.products.length > 0) {
        this.nextProductId = Math.max(...this.products.map((p) => p.id)) + 1;
      }
    } catch (error) {
      console.log('No se pudo cargar el archivo de productos. Iniciando con lista vacía.');
      this.products = [];
    }
  }

  async saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    try {
      await fileUtils.writeFile(PRODUCTS_FILE_PATH, data);
    } catch (error) {
      console.log('Error al guardar productos:', error.message);
    }
  }
}

// Exportar la clase del servicio
module.exports = new ProductService();
