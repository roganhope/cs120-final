const SalesModel = require('../models/SalesModel');
const salesModel = new SalesModel(
    "mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/"
);
const ClientsModel = require("../models/ClientModel");
const clientsModel = new ClientsModel(
    "mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/"
);
const InventoryModel = require("../models/InventoryModel");
const inventoryModel = new InventoryModel(
    "mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/"
);

const { ObjectId } = require('mongodb');

async function getSale(req, res) {
    try {
        const total = await salesModel.getTotalSales();
        const salesData = await salesModel.getAllSales();
        const clientData = await clientsModel.getAllClients();

        const salesWithClientNames = salesData.map(sale => {
            const client = clientData.find(client => client._id.equals(new ObjectId(sale.client_id)));
            const clientName = client ? `${client.first} ${client.last}` : 'Unknown';
            return { ...sale, client_name: clientName };
        });

        res.render('sales/sales', {
            pageTitle: 'Sales Data',
            customCSS: '/css/sales.css',
            totalSales: total.totalSales,
            totalDownPayments: total.totalDownPayments,
            sales: salesWithClientNames
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
        const newSale = await salesModel.createSale(saleData);
        const saleId = newSale._id;

        // Update sale_id in inventory based on VIN
        await inventoryModel.updateSaleIdByVin(req.body.vin, saleId);

        res.redirect('/sales');
    } catch (error) {
        console.error('Failed to create sale:', error);
        res.status(500).send('Failed to record sale.');
    }
}

module.exports = { getSale, newSale, uploadSale};