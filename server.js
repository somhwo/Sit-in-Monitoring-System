const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/',         (req, res) => res.render('index',    { page: 'home' }));
app.get('/login',    (req, res) => res.render('login',    { page: 'login' }));
app.get('/register', (req, res) => res.render('register', { page: 'register' }));

app.post('/login', (req, res) => {
  const { idNumber, password } = req.body;
  // TODO: Add real authentication
  console.log('Login attempt:', idNumber);
  res.redirect('/');
});

app.post('/register', (req, res) => {
  const data = req.body;
  // TODO: Add real registration logic
  console.log('Register attempt:', data);
  res.redirect('/login');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`CCS Sit-in running on http://localhost:${PORT}`));
