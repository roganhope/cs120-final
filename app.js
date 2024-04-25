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





const { getSale, newSale, uploadSale } = require('./src/controllers/SalesController');
app.get('/sales', getSale);
app.get('/newSales', newSale);
app.post('/sales/new', uploadSale);

const { uploadShipment, newShipment, getShipment } = require('./src/controllers/ShipmentController');
const {  getInventory, uploadInventory, getInventoryFromShipment } = require('./src/controllers/InventoryController');

app.get('/inventory', getInventory);
app.get('/shipment', newShipment);

app.get('/shipment/:shipmentID', async (req, res) => {
    console.log("woohoo")
    const shipmentID = req.params.shipmentID;
    console.log("shipment id here " + shipmentID.toString())
    const inventoryData = await getInventoryFromShipment(res, req, shipmentID)
    console.log("Type of inventory:", typeof inventoryData);
   
    console.log(JSON.stringify(inventoryData));
    const shipmentData = await getShipment(req, res, shipmentID, inventoryData);
});

const upload = require('./src/controllers/MulterFileController');
app.post('/shipment/new',upload.single('file'), async (req, res) => {
    try {
        const fileData = req.file;
        console.log('File data:', fileData);
    
        console.log("REQ POST DATA : " + JSON.stringify(req.body));
   
        // make a shipment first so you have ship id for the inventory 
        const shipmentResult = await uploadShipment(req);
        if (shipmentResult && shipmentResult.acknowledged === true) {
            shipmentResult.filePath = fileData.path;
            console.log("RETURNED SHIP BODY " + JSON.stringify(shipmentResult))
            console.log("ready to upload inventory")
            const inventoryResult = await uploadInventory(shipmentResult);
            console.log(shipmentResult.shipmentID)
            res.redirect(`/shipment/${shipmentResult.shipmentID.toString()}`);
            return; 
        }
    } catch (error) {
        console.error('Error processing shipment:', error);
        res.status(500).send('Error processing shipment');
    }
});



// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
