const ClientsModel = require("../models/ClientModel");

const clientsModel = new ClientsModel(
  "mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/"
);

//including sales model
const SalesModel = require("../models/SalesModel");

const salesModel = new SalesModel(
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

async function getClientSales(req, res) {
  const clientId = req.params.clientId; // Make sure clientId is passed correctly in the route

  try {
    const client = await clientsModel.getClientById(clientId);
    const salesData = await salesModel.getSalesByClientId(clientId);

    if (!client) {
      res.status(404).send("Client not found");
      return; // Stop further execution if no client is found
    }
    res.render("clients/clientSales", {
      pageTitle: "Client Sales",
      customCSS: "/css/clientSales.css",
      sales: salesData,
      clientId: clientId,
      clientName: `${client.first} ${client.last}`,
    });
  } catch (error) {
    console.error("Error accessing sales data for client:", error);
    res.status(500).send("Unable to retrieve sales data.");
  }
}

module.exports = { getClients, newClient, uploadClient, getClientSales };
