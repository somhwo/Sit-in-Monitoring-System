const express = require('express');
const app = express();
const path = require('path');

// REMOVED: EJS view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/dist'))); // Vite build output
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// POST routes stay exactly the same
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

// Catch-all: removed res.render() GET routes, React Router handles all pages
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`CCS Sit-in running on http://localhost:${PORT}`));