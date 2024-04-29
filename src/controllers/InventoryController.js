const InventoryModel = require('../models/InventoryModel');
const inventoryModel = new InventoryModel("mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/");
const fs = require('fs').promises;
const csv = require('csv-parser');
const csvtojson = require('csvtojson');  
const SalesModel = require('../models/SalesModel');
const salesModel = new SalesModel("mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/");   
const ClientModel = require('../models/ClientModel');
const clientModel = new ClientModel("mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/");   


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
    console.log(req.shipmentID)
    const shipmentID = req.shipmentID;

    try {
        const jsonArray = await processInventoryFile(req.filePath);
        let jsonArrayWithShipmentID = jsonArray.map(obj => ({ ...obj, shipmentID })); 
        jsonArrayWithShipmentID = jsonArray.map(obj => ({ ...obj, shipmentID }));
        const status_id = "ORDERED";
        var jsonArrayWithStatus = jsonArrayWithShipmentID.map(obj => ({ ...obj, status_id }));
        jsonArrayWithStatus = jsonArrayWithStatus.map(obj => ({ ...obj, sale_id: null }));
        await inventoryModel.uploadBulkInventory(jsonArrayWithStatus)
        // TO DO: MODEL LOGIC UPOLOAD NNEW MAKE AND MODEL
    } catch (error) {
        console.error('Error uploading inventory:', error);
    }

}

async function getInventoryFromShipment(req, res, shipmentID){
    console.log("shipment id in inventory controller is " + shipmentID)
    try {
        const inventory = await inventoryModel.getInventoryFromShipment(shipmentID);
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
        const data = await inventoryModel.getInventory();
        const totalInventories = await inventoryModel.getTotalInventory();
        res.render('inventory/allInventory', {
            pageTitle: 'View Inventory',
            customCSS: '/css/inventory.css',
            totalInventories: totalInventories,
            inventory: data
        });
        
    }
    catch (error){
        console.error("Error locating inventory", error);
    }
}

async function markEntireShipmentInventoryAsArrived(req, res){
    console.log("updating inventory in shipment")
    inventoryModel.markEntireShipmentInventoryAsArrived(req.body.shipID);
}


const getSingleInventory = async (req, res) => {
    try {
        const inventoryID = req.params.inventoryID;
        //console.log(inventoryID)
        const inventoryData = await inventoryModel.getSingleInventory(inventoryID);
        var saleData = null;
        var clientData = null
        if (inventoryData.sale_id) {
            
            //console.log("Sale ID exists:", inventoryData.sale_id);
            saleData = await salesModel.getSale(inventoryData.sale_id);
            clientData = await clientModel.getClientById(saleData.client_id)
            //console.log(clientData)
            // console.log("sale data returned " + saleData)
        } else {
            // The inventoryData does not have a sale_id
            //console.log("Sale ID does not exist");
        }
        // to do add in logic for sale data
        res.render('inventory/singleInventory', {
            pageTitle: 'View Inventory',
            customCSS: '/css/inventory.css',
            inventory: inventoryData,
            sale: saleData,
            clientData: clientData
        });
        
    }
    catch (error){
        console.error("Error locating inventory", error);
    }
   
  
}
const updateInventoryImage = async (req, res) => {
    try{
    
        await inventoryModel.updateImage(id, newPath)
 

    }
    catch (error) {
        console.log("error updating image path", error)
    }
}

async function updateInventoryStatus(req, res) {
    const inventoryID = req.params.inventoryID;
    const { newStatus } = req.body;

    try {
        await inventoryModel.updateStatusById(inventoryID, newStatus);
        res.redirect(`/inventory/${inventoryID}`);
    } catch (error) {
        console.error('Error updating inventory status:', error);
        res.status(500).send({ error: 'Internal server error.' });
    }
}
;

module.exports = { updateInventoryImage, getSingleInventory, markEntireShipmentInventoryAsArrived, getInventory, uploadInventory, getInventoryFromShipment, updateInventoryStatus};