const { MongoClient, ObjectId } = require("mongodb");

class ClientsModel {
  constructor(uri) {
    this.client = new MongoClient(uri);
    this.database = this.client.db("mopedmark");
    this.clients = this.database.collection("clients");
  }

  async connect() {
    await this.client.connect();
  }

  async getAllClients() {
    await this.connect();
    return await this.clients.find({}).toArray();
  }

  async getTotalNumberOfClients() {
    await this.connect();
    try {
      return await this.clients.countDocuments({});
    } finally {
      await this.close();
    }
  }

  async getClientById(clientId) {
    await this.connect();
    const clientIdToString = clientId.toString();
    const clientData = await this.clients.findOne({
      _id: new ObjectId(clientIdToString),
    });
    return clientData;
  }

  async close() {
    await this.client.close();
  }

  async createClient(clientData) {
    await this.connect();
    const result = await this.clients.insertOne(clientData);
    console.log("Client create with ID: ", result.insertedId);
    await this.client.close();
  }

  async getTotalClients() {
    await this.connect();
    const totalClients = await this.clients.countDocuments();
    return totalClients;
  }

  async updateClientNotes(clientId, updatedNotes) {
    await this.connect();
    const result = await this.clients.updateOne(
      { _id: new ObjectId(clientId) },
      { $set: { notes: updatedNotes } }
    );
    await this.close();
    return result;
  }
}

module.exports = ClientsModel;
