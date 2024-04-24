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

    async Inventory(inventoryData){
        // createa a new shipment

    }

 
}

module.exports = InventoryModel;