const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

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
    const shipID = result.insertedId;
    console.log("SHIPMENT MODEL LOG: shipment created with ID:", shipID);
    await this.client.close();
    return result;
  }

  async getShipment(shipID) {
    console.log("shipment id in get shipment model" + shipID);
    await this.connect();
    try {
      const objectId = new ObjectId(shipID);
      const shipmentData = await this.shipments.findOne({ _id: objectId });
      // console.log('Retrieved shipment:', shipmentData);
      return shipmentData;
    } catch (error) {
      console.error("Error retrieving shipment:", error);
      throw error;
    } finally {
      await this.client.close();
    }
  }

  // gets all shipments
  async getShipments() {
    console.log("shipment model is retrieving shipments");
    await this.connect();
    try {
      const cursor = this.shipments.find();
      const data = await cursor.toArray();
      if (data.length === 0) {
        console.log("No records found for shipments");
        return null;
      }
      console.log("Found shipments");
      return data;
    } catch (error) {
      console.error("Error retrieving shipments data :", error);
      throw error;
    } finally {
      await this.client.close();
    }
  }

  async getTotalShipments() {
    await this.connect();
    const totalShipments = await this.shipments.countDocuments();
    return totalShipments;
  }
}

module.exports = ShipmentModel;
