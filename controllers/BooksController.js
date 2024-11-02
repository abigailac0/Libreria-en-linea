// controllers/BooksController.js
const fs = require('fs');
const path = require('path');

const BooksController = {
    // Mostrar la lista de libros
    index: (req, res) => {
        const dataPath = path.join(__dirname, '../data/books.json');
        const books = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        res.render('index', { books, title: 'Librería Online' });
    },

    // Agregar un nuevo libro
    add: (req, res) => {
        const { title, author, year, price, cover } = req.body;
        const newBook = { title, author, year, price, cover };
        const dataPath = path.join(__dirname, '../data/books.json');
        
        const books = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        books.push(newBook); // Agregar el nuevo libro al arreglo
        
        fs.writeFileSync(dataPath, JSON.stringify(books, null, 2)); // Guardar el archivo
        res.redirect('/books'); // Redirigir a la lista de libros
    },

    // Editar un libro existente
    edit: (req, res) => {
        const dataPath = path.join(__dirname, '../data/books.json');
        const books = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        const book = books[req.params.id]; // Obtener el libro por índice
        res.render('edit-book', { book });
    },

    // Actualizar los datos del libro
    update: (req, res) => {
        const { title, author, year, price, cover } = req.body;
        const dataPath = path.join(__dirname, '../data/books.json');
        const books = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        books[req.params.id] = { title, author, year, price, cover }; // Actualizar el libro

        fs.writeFileSync(dataPath, JSON.stringify(books, null, 2)); // Guardar los cambios
        res.redirect('/books'); // Redirigir a la lista de libros
    },

    // Eliminar un libro
    delete: (req, res) => {
        const dataPath = path.join(__dirname, '../data/books.json');
        let books = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        books = books.filter((_, index) => index !== parseInt(req.params.id)); // Eliminar el libro
        fs.writeFileSync(dataPath, JSON.stringify(books, null, 2)); // Guardar cambios

        res.redirect('/books'); // Redirigir a la lista de libros
    }
};

module.exports = BooksController;