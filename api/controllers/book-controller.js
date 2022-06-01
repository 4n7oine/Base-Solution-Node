const model = require("../models/book-model");

class BookController {
    static MANDATORY = ["title", "cover", "price", "description", "isbn"];

    getCategories(req, res) {
        res.send(model.getCategories());
    }

    getCategoryBooks(req, res) {
        res.send(model.getBooks(req.params.category));
    }

    getBook(req, res) {
        const book = model.getBook(parseInt(req.params.id));
        if (book) {
            res.send(book);
        } else {
            res.status(404).send(`Book with id ${req.params.id} not found.`);
        }
    }

    checkBookProperties(res, book, id) {
        let result = true;

        const mandatoryNames = [...BookController.MANDATORY];

        if (id) {
            mandatoryNames.push("id");
        }

        const containedNames = mandatoryNames.filter(c => c in book);
        if (containedNames.length < mandatoryNames.length) {
            const necessary = mandatoryNames.join(", ");
            const contained = containedNames.length === 0 ? "none of those" : "only " + containedNames.join(", ");
            res.status(400).send(`Book data must include ${necessary}, but ${contained} present.`);
            result = false;
        }

        // If id given, check if it matches the one in the book
        if (id && result) {
            if (book.id !== id) {
                res.status(400).send(`Book data can only be updated if the id in the path (${id}) and the id in the body (${book.id}) match.`);
                result = false;
            }
        }

        return result;
    }

    createBook = (req, res) => {
        /* --- Task 2 --- 
         * Add the book given in the request to the model.
         * Check the incoming data! The category must exist, the book data
         * include all necessary properties (you can use
         * checkBookProperties(res, req.body) to do that).
         * 
         * After you created the book in the model, return it in the response
         */


        if (this.checkBookProperties(res, req.body)) {
            const book = model.createBook( req.params.category, req.body);
            res.send(book);
        } else {
            res.status(200).send(book);
        }

    }

    updateBook = (req, res) => {
        /* --- Task 3 --- 
         * Add the book given in the request to the model.
         * Check the incoming data! The book with the given id must exists,
         * the id given in the path must match the id in the book, the book
         * data must include all necessary properties (you can use
         * checkBookProperties(res, req.body, parseInt(req.params.id))) to
         * accomplish that.
         * 
         * After you updated the book in the model, send back status 200.
         */

        if (this.checkBookProperties(res, req.body, parseInt(req.params.id))) {
            console.log("Update in");
            model.updateBook(parseInt(req.params.id), req.body);
            const newBook = model.getBook(parseInt(req.params.id));
            res.status(200);
        } else {
            res.status(200).send(`Book updated.`);
        }



    }

    deleteBook(req, res) {
        /* --- Task 4 --- 
         * Delete the given book from the model.
         * Check the incoming id!
         * 
         * After deleting the book, send back status 204.
         */
        const book = model.getBook(parseInt(req.params.id));
        if (book!=null) {
            model.deleteBook(parseInt(req.params.id));
            res.status(204).send(`Book deleted.`);
        } else {
            res.send(`Book not deleted.`);
        }
    }
}

module.exports = new BookController();
