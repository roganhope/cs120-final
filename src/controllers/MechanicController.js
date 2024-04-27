const ModelModel = require('../models/ModelModel.js');
const modelModel = new ModelModel("mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/");

const InventoryModel = require('../models/InventoryModel');
const inventoryModel = new InventoryModel("mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/");



async function getHub(req, res) {
    try {
        const models = await modelModel.getAllModels()
        console.log("gethub found tge models: " + models)
        res.render('mechanic/mechanicHub', {
            pageTitle: 'Mechanic Hub',
            customCSS: '/css/mechanichub.css',
            models: models
        });
    } catch (error) {
        console.error("Error accessing hub data:", error);
        res.status(500).send("unable to retrieve hub data.");
    }
}

async function getModel(req, res) {
    const make = req.params.make;
    const model = req.params.model;
    const data = await modelModel.getSpeceficModel(make, model)
    const inventory = await inventoryModel.getInventoryByMakeModel(make, model)
    console.log("in get model", make, model)
    res.render('mechanic/makeModel', {
        pageTitle: 'View Model',
        customCSS: '/css/mechanichub.css',
        data: data,
        inventory: inventory

    });
}



async function updateMechanicNotes(req, res) {
    console.log("updating notes")
    const make = req.params.make;
    const model = req.params.model;
    const mechanicNotes = req.body.mechanic_notes;
    console.log("mechanic notes" + mechanicNotes, make, model)

    try {
        const updatedModel = await modelModel.updateMechanicNotes(make, model, mechanicNotes);

        // await new Promise(resolve => setTimeout(resolve, 1000)); 
        const inventory = await inventoryModel.getInventoryByMakeModel(make, model);

        res.render('mechanic/makeModel', {
            pageTitle: 'View Model',
            customCSS: '/css/mechanichub.css',
            data: updatedModel,
            inventory: inventory
        });

    } catch (error) {
        console.error("Error updating mechanic notes:", error);
        // Handle the error appropriately
        res.status(500).send("Error updating mechanic notes");
    }

   
    
}

async function updateImage(make, model, newPath) {

    try{
    
  await modelModel.updateImage(make, model, newPath)
 

    }
    catch (error) {
        console.log("error updating image path", error)
    }
    
}


module.exports = { updateMechanicNotes, getModel, getHub, updateImage};