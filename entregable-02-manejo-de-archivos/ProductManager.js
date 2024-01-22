const fs = require("fs");

class ProductManager {
    static idCounter = 0;

    constructor(path) {
        this.path = path;
        this.products = this.getProducts();
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, "utf-8");
            const products = JSON.parse(data);
            // ProductManager.idCounter = products.length + 1;
            return products;
        } catch (error) {
            console.error("Error al leer el archivo");
            return [];
        }
    }

    addProduct(product) {
        if (this.getProductByCode(product.code)) {
            console.warn(`Ya existe un producto con el código ${product.code}`);
            return;
        }

        try {
            product.id = ++ProductManager.idCounter;
            this.products.push(product);
            // ProductManager.idCounter++;
            const products = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, products);
            console.log("Product added successfully");
        } catch (error) {
            console.error("Error adding product");
        }
    }

    getProductByCode(code) {
        return this.products.find((product) => product.code === code);
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            console.error("Product not found");
            return null;
        }
        return product;
    }

    updateProductById(id, product) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) {
            console.error(`Product id ${id} not found`);
            return null;
        }

        try {
            product.id = id;
            this.products[index] = product;
            const products = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, products);
            console.log("Producto actualizado con éxito");
            return product;
        } catch (error) {
            console.error("Error al actualizar el producto");
        }
    }

    deleteProductById(id) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) {
            console.warn(`No se encontró el producto con id ${id}`);
        }

        try {
            this.products.splice(index, 1);
            const products = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, products);
            return "Producto eliminado con éxito";
        } catch (error) {
            console.error("Error al eliminar el producto");
        }
    }
}

// -------- EJECUCIÓN DEL PROGRAMA - TESTING -------- //
const productManager = new ProductManager("./productos.json");

console.clear();
console.log("✅ Llamando a getProducts() apenas se instancia el array. Debe devolver un array vacío");
console.log(productManager.getProducts());

console.log("");
console.log("✅ Se intenta agregar el primer producto que cumpla con todas las condiciones");

productManager.addProduct({
    title: "Globo Terraqueo",
    description: "Globo terraqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    code: "GLO-0001",
    stock: 345,
});

console.log("Se chequea que se haya agregado el producto al array");
console.log(productManager.getProducts());

console.log(" ");
console.log("🔴 Se intenta agregar el segundo producto con código repetido");
productManager.addProduct({
    title: "Escuadra",
    description: "Escuadra de 20cm",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    code: "GLO-0001",
    stock: 123,
});

console.log("Se chequea el estado del array. Debería devolver un elemento");
console.log(productManager.getProducts());

console.log("");
console.log("✅ Se agrega el segundo y tercer producto");
productManager.addProduct({
    title: "Escuadra",
    description: "Escuadra de 20cm",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    code: "ESC-0001",
    stock: 123,
});
productManager.addProduct({
    title: "Regla",
    description: "Regla de 30cm",
    price: 456.78,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    code: "REG-0001",
    stock: 456,
});

console.log("⏳ Se chequea el estado del array. Debería devolver 3 elementos");
console.log(productManager.getProducts());

console.log("🟡 --- Prueba del método getProductId() --- ");
console.log("✅ Se busca producto con ID 2 existente");
console.log(productManager.getProductById(2));

console.log("");
console.log("🔴 Se busca producto con ID 30 inexistente");
console.log(productManager.getProductById(30));

console.log("");
console.log("🟡 --- Prueba del método updateProductById() --- ");
console.log("✅ Se actualiza un producto por id");
console.log(
    "Actualización de producto por id 3: \n",
    productManager.updateProductById(3, {
        title: "Regla",
        description: "Regla de 15cm",
        price: 256.5,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        code: "REG-0002",
        stock: 64,
    })
);

console.log("🔴 Se intenta actualizar un producto por id inexistente");
console.log(
    productManager.updateProductById(4, {
        title: "Regla",
        description: "Regla de 30cm",
        price: 456.78,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        code: "REG-0001",
        stock: 456,
    })
);
