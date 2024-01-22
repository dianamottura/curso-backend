// @ts-check

class ProductManager {
    static idCounter = 0;

    constructor() {
        this.products = [];
    }

    /**
     *
     * @param {Product} product
     * @returns
     */
    addProduct(product) {
        // Chequeo que el objeto entrante sea una instancia de Product
        // De esta manera me aseguro que al recorrer el objeto con el for in
        // se evalúen los campos esperados.
        // Puede que esto no sea necesario en el futuro y lo tenga que modificar
        if (!(product instanceof Product)) {
            console.error("El objeto entrante no es una instancia de la clase Product");
            return;
        }

        // Aplico el método for in para iterar sobre todos los campos
        // del objeto y verificar que no estén vacíos
        for (const element in product) {
            // if (element === "id") continue;

            if (!product[element]) {
                console.error("Todos los campos son obligatorios");
                return;
            }
        }

        // Se verifica que ningún código se repita
        for (const element of this.products) {
            if (element.code == product.code) {
                console.error("El código ya existe");
                return;
            }
        }

        product.id = ++ProductManager.idCounter;
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    /**
     * @param {number} id
     * @returns {Product | null}
     */
    getProductById(id) {
        const product = this.products.find((product) => product.id === id);

        if (!product) {
            console.error("Product not found");
            return null;
        }

        return product;
    }
}
