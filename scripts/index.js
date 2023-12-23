// ---- DEFINICIÓN DE VARIABLES ---- //
const products = new ProductManager();

// Testeo de un objeto que cumpla todas las condiciones
const product1 = new Product({ title: "producto1", description: "Primer Producto", price: 1000, code: "abc123", stock: 10 });

// Aquí vamos a testear agregar un producto con código repetido
const product2 = new Product({ title: "producto2", description: "Segundo Producto", price: 2000, code: "abc123", stock: 25 });

// Producto con algún campo incompleto
const product3 = new Product({ title: "", description: "Tercer Producto", price: 1500, code: "abc234", stock: 20 });

// Más objetos que cumplan las condiciones para rellenar el array
const product4 = new Product({ title: "producto4", description: "Cuarto Producto", price: 3500, code: "abc345", stock: 30 });

const product5 = new Product({ title: "producto5", description: "Quinto Producto", price: 4500, code: "abc456", stock: 35 });

const product6 = { title: "producto6", description: "Sexto Producto", price: 5500, code: "abc567", stock: 45 };

// -------- EJECUCIÓN DEL PROGRAMA -------- //
console.clear();
console.log("✅ Llamando a getProducts() apenas se instancia el array. Debe devolver un array vacío");
console.log(products.getProducts());

console.log(" ");
console.log("✅ Se intenta agregar el primer producto que cumpla con todas las condiciones");
products.addProduct(product1);

console.log("Se chequea que se haya agregado el producto al array");
console.table(products.products);

console.log(" ");
console.log("🔴 Se intenta agregar el segundo producto con código repetido");
products.addProduct(product2);

console.log("Se chequea el estado del array. Debería devolver un elemento");
console.table(products.products);
console.log(products.getProducts());

console.log(" ");
console.log("🔴 Se intenta agregar el tercer producto con campos vacíos");
products.addProduct(product3);

console.log("Se chequea no que se haya agregado el producto al array");
console.table(products.products);

console.log(" ");
console.log("✅ Se agregan productos 4 y 5");
products.addProduct(product4);
products.addProduct(product5);

console.log("Deberían haber 3 elementos en el array");
console.table(products.getProducts());

console.log(" ");
console.log("🔴 Se intenta agregar el sexto producto sin instanciar");
products.addProduct(product6);

console.log(" ");
console.log("🟡 --- Prueba del método getProductId() --- ");
console.log("Buscando producto con ID existente");
console.log(products.getProductById(2));
console.log("Buscando producto con ID inexistente");
console.log(products.getProductById(30));
