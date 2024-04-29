const ClientsModel = require("../models/ClientModel");

const clientsModel = new ClientsModel(
  "mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/"
);

//including sales model
const SalesModel = require("../models/SalesModel");
const salesModel = new SalesModel(
  "mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/"
);

//including inventory model
const InventoryModel = require("../models/InventoryModel");
const inventoryModel = new InventoryModel(
  "mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/"
);

// async function getClients(req, res) {
//   try {
//     const clientsData = await clientsModel.getAllClients();

//     const totalClients = await clientsModel.getTotalNumberOfClients();

//     res.render("clients/clients", {
//       pageTitle: "Client Data",
//       customCSS: "/css/clients.css",
//       totalClients: totalClients,
//       clients: clientsData,
//     });
//   } catch (error) {
//     console.error("Error accessing client data:", error);
//     res.status(500).send("Unable to retrieve client data.");
//   }
// }
async function getClients(req, res) {
  try {
    const clientsData = await clientsModel.getAllClients();
    const totalClients = await clientsModel.getTotalNumberOfClients();

    // Assuming salesModel and inventoryModel are available and properly initialized
    const clientIds = clientsData.map((client) => client._id.toString());
    const salesData = await salesModel.getSalesByClientIds(clientIds);
    const saleIds = salesData.map((sale) => sale._id);
    const inventoryData = await inventoryModel.getScooterDetailsBySaleIds(
      saleIds
    );
    // console.log(clientIds);
    // console.log(salesData);
    // console.log(saleIds);
    // console.log(inventoryData);
    // Integrate sales and inventory data with client data
    // const clientsWithDetails = clientsData.map((client) => {
    //   const clientSales = salesData.filter((sale) =>
    //     sale.client_id.equals(client._id.toString())
    //   );
    //   const clientInventory = inventoryData.filter((item) =>
    //     clientSales.some((sale) => sale._id.equals(item.saleId))
    //   );
    const clientsWithDetails = clientsData.map((client) => {
      const clientSales = salesData.filter(
        (sale) => sale.client_id === client._id.toString()
      );
      const clientInventory = inventoryData.filter((item) =>
        clientSales.some(
          (sale) => item.sale_id.toString() === sale._id.toString()
        )
      );
      return {
        ...client,
        scooter:
          clientInventory
            .map((item) => `${item.color} ${item.make} ${item.model}`)
            .join(", ") || "N/A",
        order_status: clientSales.some((sale) => sale.date_completed === null)
          ? "In Progress"
          : "No Order",
        client_status: clientSales.some((sale) => sale.date_completed === null)
          ? "Active"
          : "Inactive",
      };
    });

    res.render("clients/clients", {
      pageTitle: "Client Data",
      customCSS: "/css/clients.css",
      totalClients: totalClients,
      clients: clientsWithDetails, // Pass the modified clients array with additional details
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
    const clientData = await clientsModel.getClientById(clientId);
    const salesData = await salesModel.getSalesByClientId(clientId);
    console.log(clientData);
    if (!clientData) {
      res.status(404).send("Client not found");
      return; // Stop further execution if no client is found
    }
    res.render("clients/clientSales", {
      pageTitle: "Client Sales",
      customCSS: "/css/clientSales.css",
      sales: salesData,
      clientId: clientId,
      clientData: clientData,
      clientName: `${clientData.first} ${clientData.last}`,
    });
  } catch (error) {
    console.error("Error accessing sales data for client:", error);
    res.status(500).send("Unable to retrieve sales data.");
  }
}
async function updateClientNotes(req, res) {
  const clientId = req.params.clientId;
  const updatedNotes = req.body.client_notes;
  console.log(updatedNotes);
  try {
    await clientsModel.updateClientNotes(clientId, updatedNotes);
    res.redirect("/clients/" + clientId); // Redirect back to the client details page
  } catch (error) {
    console.error("Error updating client notes:", error);
    res.status(500).send("Failed to update client notes.");
  }
}

module.exports = {
  getClients,
  newClient,
  uploadClient,
  getClientSales,
  updateClientNotes,
};
