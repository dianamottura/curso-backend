// @ts-check

class Product {
    /**
     * @param {{ title: string; description: string; price: number; code: string; stock: number; }} product
     */
    constructor(product) {
        this.id = -1;
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.thumbnail = "Sin imagen";
        this.code = product.code;
        this.stock = product.stock;
    }
}
