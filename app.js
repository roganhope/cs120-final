const express = require('express');
const app = express();


app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.get('/login', (req, res) => {
    res.render('login');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
