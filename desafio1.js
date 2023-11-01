class ProductManager {
    constructor() {
      this.products = [];
      this.nextProductId = 1; 
    }
  
    addProduct(product) {
   
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.log("Error: Todos los campos son obligatorios.");
        return;
      }
  
    
      if (this.products.some((p) => p.code === product.code)) {
        console.log("Error: Ya existe un producto con el mismo código.");
        return;
      }
  
      
      product.id = this.nextProductId;
      this.nextProductId++; 
      this.products.push(product);
      console.log("Producto agregado con éxito.");
    }
  
    getProducts() {
      return this.products;
    }
  
    getById(id) {

        const product = this.products.find((p) => p.id === id);
        if (!product) {
          console.log("Error not found");
        }
        return product; 
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
      code:"a556" ,
      stock: 12,
    });
    
    const productById = manager.getById(1); 
    console.log(productById);
    
    const productById2 = manager.getById(3); 