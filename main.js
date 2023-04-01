class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts = () => {
    return this.products;
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Datos incompletos");
      return null;
    }

    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    }
    if (this.products.length === 0) {
      product.id = 1;
    } else {
      const lastProduct = this.products[this.products.length - 1]
      product.id = lastProduct.id + 1;
    }

    // Verificar que el código no esté en uso
    const productWithCode = this.products.find(product => product.code === code);
    if (productWithCode) {
      throw new Error("El código del producto ya está en uso. Revisa que no hayan productos con el mismo código e intenta nuevamente.");
    }
    this.products.push(product);
  }
}

const productManager = new ProductManager();

const testProduct = {
  title: 'producto de prueba',
  description: 'Este es un producto de prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25
}

const tasaDeGato = {
  title: 'Taza de gato',
  description: 'Una tasa de gato linda',
  price: 500,
  thumbnail: 'Sin imagen',
  code: 'abc1234',  //Pon el mismo codigo que en el producto de arriba para ver el error en consola
  stock: 15
}

const televisor = {
  title: 'Televisor Led 32"',
  description: 'Television grande',
  price: 1000,
  thumbnail: 'Sin imagen',
  code: 'abc12345',
  stock: 5
}

//o repite el mismo producto aquí abajo. Tambíen saldrá el error.
productManager.addProduct(testProduct);
productManager.addProduct(tasaDeGato);
productManager.addProduct(televisor);

console.log(productManager.getProducts());

const getProductById = (productId, productManager) => {
  const product = productManager.getProducts().find(product => product.id === productId);
  if (!product) {
    throw new Error("Producto no encontrado. Por favor, ingrese una id válida.");
  }
  return product;
}

const foundproduct = getProductById(2, productManager);
if (foundproduct) {
  console.log(foundproduct);
  console.log(`El producto ${foundproduct.id} - "${foundproduct.title}" fue encontrado con exito`);
}