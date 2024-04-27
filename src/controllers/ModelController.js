const ModelModel = require('../models/ModelModel.js');
const modelModel = new ModelModel("mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/");


async function updateImage(make, model, newPath) {
    const model = await modelModel.updateImage(make, model, newPath)
    getModel(model.model, model.make)

}

module.exports = {updateImage};