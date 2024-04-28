const express = require("express");
const app = express();
const multer = require('multer');


app.set("views", "./src/views");
app.set("view engine", "ejs");

// model trigger
const ModelModel = require("./src/models/ModelModel.js");
const modelTrigger = new ModelModel(
  "mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/"
);
modelTrigger
  .watchInventoryChanges()
  .then(() => {
    console.log("Watching for inventory changes...");
  })
  .catch((error) => {
    console.error("Error setting up inventory change watcher:", error);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/dashboard", (req, res) => {
  res.render("dashboard/dashboard");
});

app.get("/", (req, res) => {
  res.render("login");
});

// app.get("/inventory", (req, res) => {
//   res.render("inventory/allInventory");
// });
// all imports
const {
  getShipments,
  uploadShipment,
  newShipment,
  getShipment,
} = require("./src/controllers/ShipmentController");
const {
  getSingleInventory,
  markEntireShipmentInventoryAsArrived,
  getInventory,
  uploadInventory,
  getInventoryFromShipment,
  updateInventoryImage
} = require("./src/controllers/InventoryController");
const { getModel, getHub, updateMechanicNotes, updateImage } = require("./src/controllers/MechanicController");
const {
  getSale,
  newSale,
  uploadSale,
} = require("./src/controllers/SalesController");
const {upload, modelImageUpload, inventoryImageUpload} = require("./src/controllers/MulterFileController");
app.get("/uploadinventory", (req, res) => {
  res.render("inventory/uploadInventory");
});

//clients
const {
  getClients,
  newClient,
  uploadClient,
  getClientSales,
} = require("./src/controllers/ClientsController");

app.get("/clients", getClients);
app.get("/newClient", newClient);
app.post("/clients/new", uploadClient);
app.get("/clients/:clientId", getClientSales);

// sales
app.get("/sales", getSale);
app.get("/newSales", newSale);
app.post("/sales/new", uploadSale);



// inventory + shipments (related)
app.get("/inventory", getInventory);
app.get("/shipments", getShipments);
app.get("/shipment/new", newShipment);

app.get("/shipment/:shipmentID", async (req, res) => {
  // console.log("woohoo")
  const shipmentID = req.params.shipmentID;
  // console.log("shipment id here " + shipmentID.toString())
  const inventoryData = await getInventoryFromShipment(res, req, shipmentID);
  // console.log("Type of inventory:", typeof inventoryData);
  console.log(JSON.stringify(inventoryData));
  await getShipment(req, res, shipmentID, inventoryData);
});

app.post("/shipment/new", upload.single("file"), async (req, res) => {
  console.log("Creating new shipment")
  try {
    const fileData = req.file;
    console.log("REQ POST DATA : " + JSON.stringify(req.body));
    const shipmentResult = await uploadShipment(req);
    if (shipmentResult && shipmentResult.acknowledged === true) {
      shipmentResult.filePath = fileData.path;
      const inventoryResult = await uploadInventory(shipmentResult);
      res.redirect(`/shipment/${shipmentResult.shipmentID.toString()}`);
      return;
    }
  } catch (error) {
    console.error("Error processing shipment:", error);
    res.status(500).send("Error processing shipment");
  }
});

app.post("/shipment/arrived/:shipID", async (req, res) => {
  try {
    const shipID = req.params.shipID;
    markEntireShipmentInventoryAsArrived(shipID);
    res.status(200).send("Shipment marked as arrived");
  } catch (error) {
    console.error("Error marking shipment as arrived:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/inventory/:inventoryID", getSingleInventory);
app.get("/mechanichub", getHub);
app.get("/mechanichub/:make/:model", getModel);
app.post("/updatemechanicnotes/:make/:model", updateMechanicNotes)



app.post('/update-model-image', modelImageUpload.single('image'), (req, res) => {
  console.log("data passed" , req.body.data.make)
  // console.log(req.body);
  const make = req.body.make
  console.log("make, " ,make)
  const model = req.body.model
  console.log("make, " ,model)
  // console.log(req.body.make);
  filePath = req.file.path
  console.log('File path, ', filePath);
  updateImage(make, model, filePath)
});


// leave this if we want ot implement images on inventory
// app.post('/update-inventory-image', inventoryImageUpload.single('image'), (req, res) => {
//   updateInventoryImage(req.id, req.file.path)
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
