const ClientsModel = require("../models/ClientModel");

const clientsModel = new ClientsModel(
  "mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/"
);

async function getClients(req, res) {
  try {
    const clientsData = await clientsModel.getAllClients();

    const totalClients = await clientsModel.getTotalNumberOfClients();

    res.render("clients/clients", {
      pageTitle: "Client Data",
      customCSS: "/css/clients.css",
      totalClients: totalClients,
      clients: clientsData,
    });
  } catch (error) {
    console.error("Error accessing client data:", error);
    res.status(500).send("Unable to retrieve client data.");
  }
}

module.exports = { getClients };
// async function getSale(req, res) {
//     try {
//         const total = await salesModel.getTotalSales();
//         const salesData = await salesModel.getAllSales();

//         res.render('sales/sales', {
//             pageTitle: 'Sales Data',
//             customCSS: '/css/sales.css',
//             totalSales: total.totalSales,
//             totalDownPayments: total.totalDownPayments,
//             sales: salesData
//         });
//     } catch (error) {
//         console.error("Error accessing sales data:", error);
//         res.status(500).send("Unable to retrieve sales data.");
//     }
// }

// async function newSale(req, res) {
//     res.render('newSales/newSales', {
//         pageTitle: 'New Sales',
//         customCSS: '/css/newSales.css',
//     });
// }

// async function uploadSale(req, res) {
//     const { client_id, sale_price, down_payment_amount } = req.body;
//     const saleData = {
//         client_id,
//         sale_price,
//         down_payment_amount,
//         date_initiated: new Date(),
//         date_completed: new Date()
//     };

//     try {
//         await salesModel.createSale(saleData);
//         res.redirect('/sales');
//     } catch (error) {
//         console.error("Error creating new sale:", error);
//         res.status(500).send("Failed to create new sale.");
//     }
// }

// module.exports = { getSale, newSale, uploadSale };
