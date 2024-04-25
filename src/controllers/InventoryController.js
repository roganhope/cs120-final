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
        let jsonArrayWithShipmentID = jsonArray.map(obj => ({ ...obj, shipmentID })); 
        jsonArrayWithShipmentID = jsonArray.map(obj => ({ ...obj, shipmentID }));
        const status_id = 1;
        const jsonArrayWithStatus = jsonArrayWithShipmentID.map(obj => ({ ...obj, status_id }));
        
        
        console.log('JSON data received:', jsonArrayWithStatus);
        await themodel.uploadBulkInventory(jsonArrayWithStatus)
        // TO DO: MODEL LOGIC UPOLOAD NNEW MAKE AND MODEL
    } catch (error) {
        console.error('Error uploading inventory:', error);
    }

}

async function getInventoryFromShipment(req, res, shipmentID){
    console.log("shipment id in inventory controller is " + shipmentID)
    try {
        const inventory = await themodel.getInventoryFromShipment(shipmentID);
        // console.log("Inventory returned from controller:", inventory);
        
        return inventory
    }
    catch (error){
        console.error("Error locating inventory for shipment", error);
    }
}

async function getInventory(req, res){
    console.log("controller is sending request to get inventory to mdoel")
    
    try {
        const data = await themodel.getInventory();
        res.render('inventory/allInventory', {
            pageTitle: 'View Inventory',
            customCSS: '/css/inventory.css',
            inventory: data
        });
        
    }
    catch (error){
        console.error("Error locating inventory", error);
    }
   
        
}


module.exports = { getInventory, uploadInventory, getInventoryFromShipment};