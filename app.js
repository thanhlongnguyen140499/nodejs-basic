const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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
    res.render('home', {
        name: 'AAA'
    });
});

var users = [
    { id: 1, name: 'Edward'},
    { id: 2, name: 'Leonard'},
    { id: 3, name: 'Frank'},  
]

app.get('/users', (req, res) => {
    res.render('users/users', {
        users: users,
    });
});

app.get('/users/search', (req, res) => {
    var q = req.query.name
    var matchedUsers = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q) !== -1;
    })
    res.render('users/users', {
        users: matchedUsers,
    })
})

app.get('/users/create', (req, res) => {
    res.render('users/create')
})

app.post('/users/create', (req, res) => {
    // console.log(req.body)
    users.push(req.body)
    res.redirect('/users')
})

app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});