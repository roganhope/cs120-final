const ModelModel = require('../models/ModelModel.js');
const themodel = new ModelModel("mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/");




async function getHub(req, res) {
    try {
        const models = await themodel.getAllModels()
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

async function getModel(req, res){
    console.log("yes")
    const make = req.params.make;
    const model = req.params.model;
    const data = await themodel.getSpeceficModel(make, model)
    console.log("in get model", make, model)
    res.render('mechanic/makeModel', {
        pageTitle: 'View Model',
        customCSS: '/css/mechanichub.css',
        data: data
        
    });

}


module.exports = {getModel, getHub};