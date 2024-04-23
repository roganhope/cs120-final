const express = require('express');
const app = express();


app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/dashboard', (req, res) => {
    res.render('dashboard/dashboard');
});

app.get('/login', (req, res) => {
    res.render('login');
});

const { getSale, newSale, uploadSale} = require('./src/controllers/SalesController');

app.get('/sales', getSale);
app.get('/newSales', newSale);
app.post('/sales/new', uploadSale);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
