const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('Hola mundo!');
});

const productManager = new ProductManager('./src/productos.json');

app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getAllProducts();

        if (limit) {
            const limitedProducts = products.slice(0, parseInt(limit));
            res.json(limitedProducts);
        } else {
            res.json(products);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(pid);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
