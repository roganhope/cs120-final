const multer = require('multer');
const path = require('path');

// Set up storage for csv files
const csvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const modelImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/model-images/'); 
  },
  filename: function (req, file, cb) {
    console.log("inside function: ", req.body.make)
    // TO DO: dyanmic file renaming to make and model that is passed
    cb(null, file.originalname); 
  }
});

const inventoryImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/inventory-images/'); 
  },
  filename: function (req, file, cb) {
    console.log("inside function: ", req.body.make)
    // TO DO: dyanmic file renaming to make and model that is passed
    cb(null, file.originalname); 
  }
});

const inventoryImageUpload = multer({ storage: inventoryImageStorage });
const modelImageUpload = multer({ storage: modelImageStorage });
const upload = multer({ storage: csvStorage });

module.exports = {upload , modelImageUpload, inventoryImageUpload};
