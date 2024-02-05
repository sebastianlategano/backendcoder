const fs = require('fs/promises');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getAllProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error al leer el archivo de productos (${this.filePath}):`, error);
      throw new Error('Error al leer el archivo de productos');
    }
  }

  async getProductById(id) {
    const products = await this.getAllProducts();

    const productId = parseInt(id);

    const product = products.find(p => p.id === productId);

    if (product) {
      console.log(`ID del producto buscado: ${productId}`);
      return product;
    } else {
      console.error(`Producto no encontrado para ID: ${productId}`);
      throw new Error('Producto no encontrado');
    }
  }
}

module.exports = ProductManager;
