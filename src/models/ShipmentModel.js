const { MongoClient } = require('mongodb');

class ShipmentModel {
    constructor(uri) {
        this.client = new MongoClient(uri);
        this.database = this.client.db("mopedmark");
        this.shipments = this.database.collection("shipments");
    }

    async connect() {
        await this.client.connect();
    }


    async close() {
        await this.client.close();
    }

    async createShipment(shipmentData) {
        await this.connect();
        const result = await this.shipments.insertOne(shipmentData);
        console.log('Sale created with ID:', result.insertedId);
        await this.client.close();
    }

}

module.exports = ShipmentModel;