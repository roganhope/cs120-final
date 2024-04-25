
const { MongoClient } = require('mongodb');
const {ObjectId} = require('mongodb');

class InventoryModel {
    constructor(uri) {
        this.client = new MongoClient(uri);
        this.database = this.client.db("mopedmark");
        this.inventory = this.database.collection("inventory");
    }
    async connect() {
        await this.client.connect();
    }
    async close() {
        await this.client.close();
    }

    async uploadBulkInventory(inventoryData) {
        console.log("uploading inventory atempt")
        await this.connect()
        try {
            await this.inventory.insertMany(inventoryData);
            console.log('All inventory data uploaded successfully');
        }
        catch (error) {
            console.error('Error uploading inventory data:', error);
            throw error;
        }
        await this.client.close()
    }

    async getInventoryFromShipment(shipID) {
        console.log("inventory model running a query")
        console.log(typeof shipID)
        console.log("ship id " + shipID.toString())
        await this.connect();
        try {
            // const objectId = new ObjectId(shipID);
            // const data = await this.inventory.find({ shipmentID: shipID }).toArray();
            const cursor = await this.inventory.find({ shipmentID: new ObjectId(shipID) });
            const data = await cursor.toArray();        

            if (data.length === 0) {
                console.log('No inventory found for shipment:', shipID);
                return null;
            }
            console.log('Found inventory');
            console.log("inventory found by model: ", data)
            return data;
        } catch (error) {
            console.error('Error retrieving inventory :', error);
            throw error;
        } finally {
            await this.client.close();
        }

    }

    async getInventory() {
        console.log("inventory model is retrieving inventory")
        await this.connect();
        try {
            
            const cursor =  this.inventory.find();
            const data = await cursor.toArray();        

            if (data.length === 0) {
                console.log('No inventory found for shipment');
                return null;
            }
            console.log('Found inventory');
            return data;
        } catch (error) {
            console.error('Error retrieving inventory :', error);
            throw error;
        } finally {
            await this.client.close();
        }

    }







}

module.exports = InventoryModel;