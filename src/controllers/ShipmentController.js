const ShipmentModel = require('../models/ShipmentModel');
const themodel = new ShipmentModel("mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/");


async function uploadShipment(req, res) {
    const { shipmentVendor, orderDate, expectedDate, total } = req.body;
    console.log(req.body);
    const shipmentData = {
        shipmentVendor,
        orderDate,
        expectedDate,
        total
    };

    console.log(shipmentData);

    try {
        await themodel.createShipment(shipmentData);
        // res.redirect('/shipments');

    } catch (error) {
        console.error("Error creating new shipment:", error);
        res.status(500).send("Failed to create new shipment.");
    }
}

module.exports = { uploadShipment};