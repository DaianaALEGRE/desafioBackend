const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 8080;

app.use(express.json());

//limit t.t
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const data = await fs.readFile('products.json', 'utf8');
    const products = JSON.parse(data);

    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos.' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const data = await fs.readFile('products.json', 'utf8');
    const products = JSON.parse(data);
    const product = products.find((p) => p.id === productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error el producto no existe.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en http://localhost:${PORT}`);
});
