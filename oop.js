const _private = new WeakMap();

class Book {
    // ====== Método constructor ======
    constructor(title, author, price) {
        // ====== Propiedades ======
        const properties = {
            _title: title,
            _author: author,
            _price: price
        }
        // Colocar propiedades como privadas:
        _private.set(this, {properties});
    }

    // ====== Métodos / Getters-Setters ======

    // Obtiene el título de un libro:
    get title() {
        return _private.get(this).properties['_title'];
    }

    // Setea/modifica el título de un libro:
    set title(newTitle) {
        return _private.get(this).properties['_title'] = newTitle;
    }

    get author() {
        return _private.get(this).properties['_author'];
    }

    set author(newAuthor) {
        return _private.get(this).properties['_author'] = newAuthor;
    }

    get price() {
        return _private.get(this).properties['_price'];
    }

    // No coloques éste setter para prices sino quieres dar acceso.
    set price(newPrice) {
        return _private.get(this).properties['_price'] = newPrice;
    }

    // Muestra todos los datos de un libro.
    getAllData() {
        console.log( `Título: ${this.title}, Autor: ${this.author}, Precio: ${this.price}`);
    }

}

class Comic extends Book {
    constructor(name, author, price, illustrators) {
        super(name, author, price);
        this.illustrators = illustrators;
    }

    addIllustrator(newIllustrator) {
        this.illustrators.push(newIllustrator)
    }

    /* ====== Ejemplo de: Polimorfismo ======
        Sobreescribe el método getAllData definido en la clase padre: Book
    */
    getAllData() {
        // Ejecuta el código de getAllData de la clase Padre
        super.getAllData();
        // Código extra para imprimir la propiedad illustrators
        console.log( `Illustradores: ${this.illustrators}` );
    }
}

class ShoppingCart {
    constructor() {
        this.products = [];
    }

    // Agregar un producto al carrito:
    addProduct(amount, price) {
        this.products.push(...Array(amount).fill(price) );
    }

    // Mostrar productos del carrito
    showProducts() {
        console.log( this.products );
    }

    // Calcular total de los productos agregados al carrito:
    calcTotal() {
        return this.products
                .map( price => price )
                .reduce( (ac, price) => ac + price, 0 );
    }

    // Imprime el total:
    printTicket() {
        console.log( `Total a pagar ${ this.calcTotal() }` )
    }
}

// Intancia de Book:
const book1 = new Book('1984', 'G.O', 350);
// Instancia de Comic:
const comic1 = new Comic('The Killing Joke', 'A.M', 150, ['B.B'] );

comic1.addIllustrator('J.H');
console.log( comic1.illustrators );

const cart = new ShoppingCart();


cart.addProduct(2, comic1.price);
cart.addProduct(3, book1.price);

cart.showProducts();

cart.printTicket();

book1.getAllData();
comic1.getAllData();

