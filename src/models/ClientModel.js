const { MongoClient } = require('mongodb');

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
        const clientData = await this.clients.find({}).toArray();
        await this.client.close();
        return clientData;
    }


    async getClientById(clientId) {
        await this.connect();
        try {
            const clientData = await this.clients.findOne({ _id: clientId });
            return clientData;
        } finally {
            await this.client.close();
        }
    }


    async close() {
        if (this.client.isConnected()) {
            await this.client.close();
        }
    }

    async createClient(clientData){
        await this.connect();
        const result = await this.clients.insertOne(clientData);
        console.log("Client create with ID: ", result.insertedId);
        await this.client.close();
    }





}

module.exports = ClientsModel;
