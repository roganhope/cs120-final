const { MongoClient } = require('mongodb');

class ClientsModel {
    constructor(uri) {
        this.client = new MongoClient(uri);
        this.database = this.client.db("mopedmark"); // 请确保数据库名称正确
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

    async close() {
        if (this.client.isConnected()) {
            await this.client.close();
        }
    }
}

module.exports = ClientsModel;
