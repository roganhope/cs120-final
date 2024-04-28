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
async function getDashboardData(req, res) {
    try {
        const totalClients = await clientsModel.getTotalClients();
        const totalSales = await salesModel.getTotalSales();
        const totalInventory = await inventoryModel.getTotalInventory();

        const userData = req.user;

        res.render("dashboard/dashboard", {
            pageTitle: "Dashboard",
            totalClients,
            totalSales,
            totalInventory,
            userData,
        });
    } catch (error) {
        console.error("Error accessing dashboard data:", error);
        res.status(500).send("Unable to retrieve dashboard data.");
    }
}

module.exports = { getDashboardData };