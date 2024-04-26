const SalesModel = require('../models/SalesModel');
const salesModel = new SalesModel("mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/");

async function getSale(req, res) {
    try {
        const total = await salesModel.getTotalSales();
        const salesData = await salesModel.getAllSales();

        res.render('sales/sales', {
            pageTitle: 'Sales Data',
            customCSS: '/css/sales.css',
            totalSales: total.totalSales,
            totalDownPayments: total.totalDownPayments,
            sales: salesData
        });
    } catch (error) {
        console.error("Error accessing sales data:", error);
        res.status(500).send("Unable to retrieve sales data.");
    }
}

async function newSale(req, res) {
    res.render('newSales/newSales', {
        pageTitle: 'New Sales',
        customCSS: '/css/newSales.css',
    });
}

async function uploadSale(req, res) {
    const { client_id, sale_price, down_payment_amount } = req.body;
    const saleData = {
        client_id,
        sale_price: parseFloat(sale_price),
        down_payment_amount: parseFloat(down_payment_amount),
        date_initiated: new Date(),
        date_completed: null
    };

    try {
        await salesModel.createSale(saleData);
        res.redirect('/sales');
    } catch (error) {
        console.error("Error creating new sale:", error);
        res.status(500).send("Failed to create new sale.");
    }
}

module.exports = { getSale, newSale, uploadSale};