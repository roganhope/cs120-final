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

async function newClient(req, res) {
  res.render("newClient/newClient", {
    pageTitle: "New Client",
    customCSS: "/css/newClient.css",
  });
}

async function uploadClient(req, res) {
  const clientData = {
    first: req.body.client_fname,
    last: req.body.client_lname,
    email: req.body.client_email,
    phone_number: req.body.client_phone,
    address: {
      street: req.body.client_street,
      city: req.body.client_city,
      state: req.body.client_state,
      zipcode: req.body.client_zipcode,
    },
    date_created: new Date(),
    notes: req.body.notes,
  };

  try {
    await clientsModel.createClient(clientData);
    res.redirect("/clients");
  } catch (error) {
    console.error("Error creating new client:", error);
    res.status(500).send("Failed to create new client.");
  }
}

module.exports = { getClients, newClient, uploadClient };
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
