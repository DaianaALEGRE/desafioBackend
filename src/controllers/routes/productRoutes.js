// productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');

// Crear el router
const router = express.Router();

// Definir rutas
router.get('/products', productController.getProducts);
router.post('/products', productController.addProduct);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Exportar el router
module.exports = router;
