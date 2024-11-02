const fs = require('fs');
const path = require('path');

const UserController = {
    // Mostrar el formulario de registro
    register: (req, res) => {
        res.render('register'); // Renderizar el formulario de registro
    },

    // Procesar el registro de usuarios
    processRegister: (req, res) => {
        const { name, email, password } = req.body;
        const newUser = { name, email, password, role: 'client' };
        const dataPath = path.join(__dirname, '../data/users.json');

        const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        users.push(newUser); // Agregar el nuevo usuario

        fs.writeFileSync(dataPath, JSON.stringify(users, null, 2)); // Guardar el archivo
        res.redirect('/users/login'); // Redirigir a la página de inicio de sesión
    },

    // Mostrar el formulario de inicio de sesión
    login: (req, res) => {
        res.render('login'); // Renderizar el formulario de login
    },

    // Procesar el inicio de sesión
    processLogin: (req, res) => {
        const { email, password } = req.body;
        const dataPath = path.join(__dirname, '../data/users.json');
        const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            req.session.user = user; // Guardar el usuario en la sesión
            res.redirect('/books'); // Redirigir a la lista de libros
        } else {
            res.render('login', { error: 'Credenciales incorrectas' });
        }
    }
};

module.exports = UserController;