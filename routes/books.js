// routes/books.js
const express = require('express');
const router = express.Router();
const BooksController = require('../controllers/BooksController');

// Ruta para mostrar la lista de libros
router.get('/', BooksController.index);

// Ruta para mostrar el formulario de agregar libro
router.get('/add', (req, res) => {
    res.render('add-book'); // Renderizar el formulario de agregar
});

// Ruta para procesar la adición del libro
router.post('/add', BooksController.add);

// Ruta para mostrar el formulario de edición
router.get('/edit/:id', BooksController.edit);

// Ruta para actualizar los datos del libro
router.post('/edit/:id', BooksController.update);

// Ruta para eliminar un libro
router.post('/delete/:id', BooksController.delete);

module.exports = router;