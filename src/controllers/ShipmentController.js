const ShipmentModel = require('../models/ShipmentModel');
const themodel = new ShipmentModel("mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/");


async function getAllShipmentInfo(req, res, shipID){
    console.log('using get shipment!')
    console.log(shipID)
    const shipmentData = await themodel.getShipment(shipID)
    console.log(JSON.stringify(shipmentData));
}

async function newShipment(req, res) {
    res.render('inventory/uploadInventory', {
        pageTitle: 'uploadInventory',
        customCSS: '/css/inventory.css',
    });
}

async function uploadShipment(req, res) {
    const { shipmentVendor, orderDate, expectedDate, total, invFile } = req.body;
    console.log("REQ POST DATA ibsude ship controller : " + JSON.stringify(req.body));
    // console.log(JSON.parse(req.body));
    const shipmentData = {
        shipmentVendor,
        orderDate,
        expectedDate,
        total
    };

    console.log("creating shipment in controller with " + shipmentData);

    try {
        const shipmentResult = await themodel.createShipment(shipmentData);

        // create new json object with the original req
        if (shipmentResult.acknowledged === true) {
            shipmentID = shipmentResult.insertedId;
            acknowledged = shipmentResult.acknowledged;
            const returnData = {
                shipmentID,
                invFile,
                acknowledged
            }
            return (returnData)
        }
        
        return(shipmentResult);

    } catch (error) {
        console.error("Error creating new shipment:", error);
        res.status(500).send("Failed to create new shipment.");
    }
}

module.exports = { uploadShipment, newShipment, getAllShipmentInfo};