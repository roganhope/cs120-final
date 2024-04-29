const express = require("express");
const app = express();
const multer = require("multer");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// oauth2
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "232301126322-5db2irp4hgmjov1cg251ep06gpchj2vt.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL:
        "https://cs120-ef3a736436d9.herokuapp.com/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    req.session.user = req.user;
    console.log(req.user);
    res.redirect("/dashboard");
  }
);
const { getDashboardData } = require("./src/controllers/DashboardController");

// app.get("/dashboard", ensureAuthenticated, getDashboardData);

app.get("/dashboard", getDashboardData);
app.get("/", (req, res) => {
  res.render("login");
});

// translate API
const {
  translateTextToEnglish,
  translateTextToSpanish,
} = require("./src/api/translate");
app.post("/translate/to/english", translateTextToEnglish);
app.post("/translate/to/spanish", translateTextToSpanish);

// this should have been a db based thing not app based
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
// app.get("/inventory", (req, res) => {
//   res.render("inventory/allInventory");
// });
// all imports
const {
  markShipmentArrived,
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
  updateInventoryImage,
} = require("./src/controllers/InventoryController");
const {
  getModel,
  getHub,
  updateMechanicNotes,
  updateImage,
} = require("./src/controllers/MechanicController");
const {
  getSale,
  newSale,
  uploadSale,
} = require("./src/controllers/SalesController");
const {
  upload,
  modelImageUpload,
  inventoryImageUpload,
} = require("./src/controllers/MulterFileController");
app.get("/uploadinventory", (req, res) => {
  res.render("inventory/uploadInventory");
});

//clients
const {
  getClients,
  newClient,
  uploadClient,
  getClientSales,
  updateClientNotes,
} = require("./src/controllers/ClientsController");

app.get("/clients", getClients);
app.get("/newClient", newClient);
app.post("/clients/new", uploadClient);
app.get("/clients/:clientId", getClientSales);
app.post("/clients/:clientId/update-notes", updateClientNotes);

// sales
app.get("/sales", getSale);
app.get("/newSales", newSale);
app.post("/sales/new", uploadSale);

// inventory + shipments (related)
app.get("/inventory", getInventory);
// app.get("/shipments", ensureAuthenticated, getShipments);
app.get("/shipments", getShipments);
app.get("/shipment/new", newShipment);
app.post("/update/shipment/arrived", async (req, res) => {
  await markShipmentArrived(req, res);
  // await markEntireShipmentInventoryAsArrived(req, res);
  res.redirect(`/shipment/${req.body.shipID}`);
});

app.get("/shipment/:shipmentID", async (req, res) => {
  // console.log("woohoo")
  const shipmentID = req.params.shipmentID;
  // console.log("shipment id here " + shipmentID.toString())
  const inventoryData = await getInventoryFromShipment(res, req, shipmentID);
  // console.log("Type of inventory:", typeof inventoryData);
  console.log(JSON.stringify(inventoryData));
  await getShipment(req, res, shipmentID, inventoryData);
});

// update inventory status
const {
  updateInventoryStatus,
} = require("./src/controllers/InventoryController");
app.post("/inventory/:inventoryID/update-status", updateInventoryStatus);

app.post("/shipment/new", upload.single("file"), async (req, res) => {
  console.log("Creating new shipment");
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
app.post("/updatemechanicnotes/:make/:model/updateNotes", updateMechanicNotes);

app.post(
  "/update-model-image",
  modelImageUpload.single("image"),
  (req, res) => {
    console.log("data passed", req.body.data.make);
    // console.log(req.body);
    const make = req.body.make;
    console.log("make, ", make);
    const model = req.body.model;
    console.log("make, ", model);
    // console.log(req.body.make);
    filePath = req.file.path;
    console.log("File path, ", filePath);
    updateImage(make, model, filePath);
  }
);

// leave this if we want ot implement images on inventory
// app.post('/update-inventory-image', inventoryImageUpload.single('image'), (req, res) => {
//   updateInventoryImage(req.id, req.file.path)
// });

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
