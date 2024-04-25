const ShipmentModel = require('../models/ShipmentModel');
const themodel = new ShipmentModel("mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/");


async function getShipment(req, res, shipID, inventoryData){
    console.log("getting shipment")
    console.log(shipID)
    const data = await themodel.getShipment(shipID);
    res.render('shipments/singleShipment', {
        pageTitle: 'View Shipment',
        customCSS: '/css/shipments.css',
        shipID: data.shipID,
        vendor: data.vendor,
        orderDate: data.orderDate,
        expectedDate: data.expectedDate,
        total: data.total,
        inventory: inventoryData
    });
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

module.exports = { uploadShipment, newShipment, getShipment};