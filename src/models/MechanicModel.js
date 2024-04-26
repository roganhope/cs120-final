const { MongoClient } = require('mongodb');


class MechanicModel {
    constructor(uri) {
        this.client = new MongoClient(uri);
        this.database = this.client.db("mopedmark");
        this.models = this.database.collection("models");
        this.inventory = this.database.collection("inventory");
    }

    async connect() {
        await this.client.connect();
    }


    async close() {
        await this.client.close();
    }

 

    
  
}
module.exports = MechanicModel;