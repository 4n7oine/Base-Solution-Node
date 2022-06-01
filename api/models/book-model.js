/* A class representing a category of books. It holds all the books belonging to this category. */
class Category {
    constructor(title, name) {
        this.name = name;
        this.title = title;
    }
}

/* A class representing a book in one of the categories. It contains getters for the ids
 * that represent the book in the main content and in the shopping cart.
 */
class Book {
    constructor(title, cover, price, description, isbn) {
        this.title = title;
        this.cover = cover;
        this.description = description;
        this.isbn = isbn;
        this.price = price;
    }
}

class BookModel {
    static CATEGORY_ID = 1;
    static BOOK_ID = 1;

    constructor() {
        this.books = new Map();
    }

    addCategory(category) {
        if (!this.books.get(category)) {
            category.id = BookModel.CATEGORY_ID++;
            this.books.set(category, new Map())
        }
    }

    getCategories() {
        return Array.from(this.books.keys());
    }

    addBook(category, book) {
        if (!this.books.get(category)) {
            throw new Error(`Unknown book category ${category.name}`)
        }
        book.id = BookModel.BOOK_ID++;
        this.getBooksAsMap(category).set(book.id, book);
    }


    getBooks(category) {
        return Array.from(this.getBooksAsMap(category).values());
    }

    resolveCategory(category) {
        if (typeof category === "string") {
            for (const [_category, books] of this.books.entries()) {
                if (_category.name === category) {
                    return _category;
                }
            }
            throw new Error(`Unknown book category ${category}`)
        } 

        return category;
    }

    getBooksAsMap(category) {
        return this.books.get(this.resolveCategory(category));
    }

    getCategory(id) {
        for (const [ category, booksAsMap] of this.books.entries()) {
            const books = Array.from(booksAsMap.values());
            if (books.find(book => book.id === id)) {
                return category;
            }
        };

        return null;
    }

    getBook(id) {
        if (typeof id !== "number") {
            throw new Error(`Given id must be an number, but is a ${typeof id}`);
        }

        let book = null;

        const category = this.getCategory(id);
        if (category) {
            book = this.books.get(category).get(id);
        }

        return book;
    }

    createBook(category, book) {
        /* --- Task 2 ---
         * Add the received book to the given category in the model and return it. */

        //Category { name: 'html5', title: 'HTML 5', id: 1 }


        let indexFound = -1;
        let array = this.getCategories()
        for (let i = 0; i < array.length; i++) {
            if(array[i].id==category){
                indexFound=i;
                console.log("Category found")
            }
        }

        const cat = array[indexFound]

        console.log(cat)

        if(indexFound>=0){
            book.id = BookModel.BOOK_ID++;
            this.getBooksAsMap(cat).set(book.id, book);
            console.log("Book created")
            return this.getBook(book.id)
        }else{
            console.log("Error, no such Categorie")
        }

    }

    updateBook(id, book) {
        /* --- Task 3 --- Update the book with the given id in the model */
        this.getBooksAsMap(this.getCategory(id)).set(book.id, book);
        console.log(this.getCategory(id))
        console.log("Book updated")
    }

    deleteBook(id) {
        /* --- Task 4 --- Delete the book with the given id from the model */
        this.getBooksAsMap(this.getCategory(id)).delete(id);
        console.log("Book removed");
    }
}

const model = new BookModel();

const html5Category = new Category("HTML 5", "html5");
model.addCategory(html5Category);
model.addBook(html5Category, new Book("Html5: Up And Running", "images/HTML5_Up_And_Running.jpg", 24.80,
    "If you don't know about the new features available in HTML5, now's the time to find out. This book provides practical information about how and why the latest version of this markup language will significantly change the way you develop for the Web.", "978-0596806026"));
model.addBook(html5Category, new Book("HTML5: Pocket Reference", "images/HTML5_Pocket_Reference.jpg", 15.90,
    "Need help finding the right HTML5 element or attribute for your web page or application? HTML5 Pocket Reference is the classic reference that web designers and developers have been keeping close at hand for more than thirteen years.", "978-1449363352"));

const jsCategory = new Category("JavaScript", "javascript");
model.addCategory(jsCategory);
model.addBook(jsCategory, new Book("JavaScript: The Definitive Guide", "images/JavaScript_The_Definitive_Guide.jfif", 47.30,
    "This Fifth Edition is completely revised and expanded to cover JavaScript as it is used in today's Web 2.0 applications. This book is both an example-driven programmer's guide and a keep-on-your-desk reference, with new chapters that explain everything you need to know to get the most out of JavaScript.", "9781449308162"));
model.addBook(jsCategory, new Book("JavaScript: The Good Parts", "images/JavaScript_The_Good_Parts.jfif", 23.90,
    "Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined.", "0596517742"));

module.exports = model;
