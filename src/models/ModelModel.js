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

    
  
    async watchInventoryChanges() {
        try {
            await this.connect();
            const changeStream = this.inventory.watch();
            const processedModels = new Set();
    
            changeStream.on('change', async (change) => {
                if (change.operationType === 'insert') {
                    const { make, model } = change.fullDocument;
    
                    // Check if the make/model combination has already been processed
                    if (!processedModels.has(`${make}-${model}`)) {
                        // Add the combination to the set of processed models
                        processedModels.add(`${make}-${model}`);
                        const image = '/images/unknown-scooter.png'
    
                        // Check if the model already exists in the database
                        const existingModel = await this.models.findOne({ make, model });
                        if (!existingModel) {
                            // Insert the new model
                            await this.models.insertOne({ make, model, image });
                            console.log(`New model added: ${make} ${model}`);
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error setting up change stream:', error);
        }
    }


    async getAllModels() {
        console.log("retrieving model list");
        await this.connect();
        try {
            const cursor = await this.models.find();
            const data = await cursor.toArray();
            if (data.length === 0) {
                console.log("No models found");
                return data; 
            }
            return data;
        } catch (error) {
            console.error('error retrieving models ', error);
            throw error; 
        } finally {
            await this.client.close();
        }
    }

    async getSpeceficModel(make, model) {
        console.log("retrieving model ");
        await this.connect();
        try {
            
            const specificModel = await this.models.findOne({ make: make, model: model });

            return specificModel;
        } catch (error) {
            console.error('error retrieving model ', error);
            throw error; 
        } finally {
            await this.client.close();
        }
    }

    async updateMechanicNotes(make, model, mechanicNotes) {
        await this.connect();
        try {
            const specificModel = await this.models.findOneAndUpdate(
                { make: make, model: model }, 
                { $set: { mechanic_notes: mechanicNotes } }, 
                { new: true } 
            );
            console.log("updated notes " + specificModel.mechanic_notes)
            return specificModel;
        } catch (error) {
            console.error('error updating notes ', error);
            throw error; 
        } finally {
            await this.client.close();
        }
    }

    // async updateImage(make, model, newPath) {
    //     console.log("UPDATING MODEL IMAGE from path received", newPath);
    //     newPath = newPath.replace(/^public\//, '');
    //     await this.connect();
    //     try {
            
    //         const specificModel = await this.models.findOne({ make: make, model: model });
    //         if (specificModel) {
    //             console.log("ID OF MODEL BEING UPDATED: ", specificModel._id)
    //             const currentPath = specificModel.image;
    //             specificModel.image = newPath;
             
    //             console.log("UPDATED MONGO FILE PATH TO: " + specificModel.image)
    //         }
            
        
    //     } catch (error) {
    //         console.error('error updating image', error);
    //         throw error;
    //     } finally {
    //         await this.client.close();
            
    //     }
    // }
    async updateImage(make, model, newPath) {
        console.log("UPDATING MODEL IMAGE from path received", newPath);
        newPath = newPath.replace(/^public(?=\/)/, ''); // Remove 'public' from the beginning of the path
    
        await this.connect();
        try {
            const specificModel = await this.models.findOne({ make: make, model: model });
            if (specificModel) {
                console.log("ID OF MODEL BEING UPDATED: ", specificModel._id);
                const currentPath = specificModel.image;
                
                // Update the image field with the new path
                const result = await this.models.updateOne(
                    { _id: specificModel._id }, // Filter for the specific model
                    { $set: { image: newPath } } // Set the new value for the image field
                );
                console.log("UPDATED MONGO FILE PATH TO: " + newPath);
                console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
            }
        } catch (error) {
            console.error('error updating image', error);
            throw error;
        } finally {
            await this.client.close();
        }
    }
    
    
    
    
}




module.exports = ModelModel;