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
        const shipID = result.insertedId
        console.log('SHIPMENT MODEL LOG: shipment created with ID:', shipID);
        await this.client.close();
        return(result)
    }

}

module.exports = ShipmentModel;