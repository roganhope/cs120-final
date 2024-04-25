const { MongoClient } = require('mongodb');
// const { ObjectId } = require('mongodb');

class ModelModel {
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

    // async watchInventoryChanges() {
    //     try {
    //         await this.connect();
    //         const changeStream = this.inventory.watch();
    //         changeStream.on('change', async (change) => {
    
    //             if (change.operationType === 'insert') {
    //                 const { make, model } = change.fullDocument;
    //                 const existingModel = await this.models.findOne({ make, model });
    //                 if (!existingModel) {
    //                     await this.models.insertOne({ make, model });
    //                     console.log(`New model added: ${make} ${model}`);
    //                 }
    //             }
    //         });
    //     } catch (error) {
    //         console.error('Error setting up change stream:', error);
    //     }
    // }
    async watchInventoryChanges() {
        try {
            await this.connect();
            const changeStream = this.inventory.watch();
    
            // Keep track of processed make/model combinations to prevent duplicates
            const processedModels = new Set();
    
            changeStream.on('change', async (change) => {
                if (change.operationType === 'insert') {
                    const { make, model } = change.fullDocument;
    
                    // Check if the make/model combination has already been processed
                    if (!processedModels.has(`${make}-${model}`)) {
                        // Add the combination to the set of processed models
                        processedModels.add(`${make}-${model}`);
    
                        // Check if the model already exists in the database
                        const existingModel = await this.models.findOne({ make, model });
                        if (!existingModel) {
                            // Insert the new model
                            await this.models.insertOne({ make, model });
                            console.log(`New model added: ${make} ${model}`);
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error setting up change stream:', error);
        }
    }
    
}



module.exports = ModelModel;