const fs = require('fs');
const csv = require('csv-parser');

const { MongoClient } = require('mongodb');

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

    async uploadBulkInventory(inventoryData){
        console.log("uploading inventory atempt")
        await this.connect()
        try {
            
                await this.inventory.insertMany(inventoryData);
            
            console.log('All inventory data uploaded successfully');        } 
            catch (error) {
            console.error('Error uploading inventory data:', error);
            throw error;
        }

        await this.client.close()
    }



    


 
}

module.exports = InventoryModel;