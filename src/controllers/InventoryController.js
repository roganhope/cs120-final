const InventoryModel = require('../models/InventoryModel');
const themodel = new InventoryModel("mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/");
const fs = require('fs').promises;
const csv = require('csv-parser');
const csvtojson = require('csvtojson');     


async function processInventoryFile(file) {
    console.log('converting fule to json')
    try {
        const fileContent = await fs.readFile(file, 'utf8');
        const jsonArray = await csvtojson().fromString(fileContent);
        await fs.unlink(file); // delete the file bc we don't need it 
        console.log('JSON data:', jsonArray);
        return jsonArray; 
    } catch (error) {
        console.error('Error reading file:', error);
        throw error; 
    }
}

async function uploadInventory(req, res) {
    console.log("helloooo")
    // console.log(req.body.shipmentID) //
    // console.log(req.body)
    // console.log(typeof req.invFile);
    // console.log(req.filePath)
    console.log(req.shipmentID)
    const shipmentID = req.shipmentID;
    try {
        const jsonArray = await processInventoryFile(req.filePath);
        
        // Now you can use jsonArray or process it further as needed
        const jsonArrayWithShipmentID = jsonArray.map(obj => ({ ...obj, shipmentID }));
        console.log('JSON data received:', jsonArrayWithShipmentID);
        await themodel.uploadBulkInventory(jsonArrayWithShipmentID)
        // TO DO: MODEL LOGIC UPOLOAD NNEW MAKE AND MODEL
        // res.redirect(`/shipment/${shipmentID.toString()}`);
    } catch (error) {
        console.error('Error uploading inventory:', error);
        
    }

}


module.exports = { uploadInventory};