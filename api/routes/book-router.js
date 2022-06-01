const { Router } = require('express');
const controller = require('../controllers/book-controller');

const routes = Router();

routes.get('/categories', controller.getCategories);
routes.get('/categories/:category/books', controller.getCategoryBooks);
routes.get('/books/:id', controller.getBook);

/* --- Task 2 --- Add a route to create new books 
   endpoint: /categories/:category/books
 */

routes.post('/categories/:category/books', controller.createBook);


/* --- Task 3 --- Add a route to update a book 
   endpoint: /books/:id
 */

routes.patch('/books/:id', controller.updateBook);


/* --- Task 4 --- Add a route to delete a book
   endpoint: /books/:id
 */

routes.delete('/books/:id', controller.deleteBook);





module.exports = routes;
