const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// ! configure express-handlebars
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b
    },
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/users', (req, res) => {
    res.render('users/users', {
        users: [
            { id: 1, name: 'Edward'},
            { id: 2, name: 'Leonard'},
            { id: 3, name: 'Frank'},
        ]
    });
});

app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});