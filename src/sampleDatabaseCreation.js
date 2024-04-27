// first upload some shipments
// Insert shipment document
db.shipments.insertOne({
    "_id": ObjectId("662be0d31e934e4f8fc5783e"),
    "orderDate": ISODate("2023-11-08"),
    "expectedDate": ISODate("2023-12-29"),
    "total": NumberInt("5000"),
    "invoiceno": "B186423",
    "shipmentVendor": "Bintelli",
    "ship_status": "ORDERED"
});

// Insert inventory documents
db.inventory.insertMany([
    {
        "shipmentid": ObjectId("662be0d31e934e4f8fc5783e"),
        "vin": "V00009",
        "year": 2024,
        "make": "bintelli",
        "model": "sprint",
        "ccs": 49,
        "color": "white",
        "purchase_price": 500,
        "retail_price": 900
    },
    {
        "shipmentid": ObjectId("662be0d31e934e4f8fc5783e"),
        "vin": "V00010",
        "year": 2024,
        "make": "bintelli",
        "model": "sprint",
        "ccs": 49,
        "color": "white",
        "purchase_price": 500,
        "retail_price": 900
    },
    {
        "shipmentid": ObjectId("662be0d31e934e4f8fc5783e"),
        "vin": "V00011",
        "year": 2024,
        "make": "bintelli",
        "model": "sprint",
        "ccs": 49,
        "color": "green",
        "purchase_price": 500,
        "retail_price": 900
    },
    {
        "shipmentid": ObjectId("662be0d31e934e4f8fc5783e"),
        "vin": "V00012",
        "year": 2024,
        "make": "bintelli",
        "model": "sprint",
        "ccs": 49,
        "color": "purple",
        "purchase_price": 500,
        "retail_price": 900
    },
    {
        "shipmentid": ObjectId("662be0d31e934e4f8fc5783e"),
        "vin": "V00013",
        "year": 2024,
        "make": "bintelli",
        "model": "sprint",
        "ccs": 49,
        "color": "white",
        "purchase_price": 500,
        "retail_price": 900
    },
    {
        "shipmentid": ObjectId("662be0d31e934e4f8fc5783e"),
        "vin": "V00014",
        "year": 2024,
        "make": "bintelli",
        "model": "beast",
        "ccs": 49,
        "color": "white",
        "purchase_price": 500,
        "retail_price": 900
    },
    {
        "shipmentid": ObjectId("662be0d31e934e4f8fc5783e"),
        "vin": "V00015",
        "year": 2024,
        "make": "bintelli",
        "model": "beast",
        "ccs": 49,
        "color": "black",
        "purchase_price": 500,
        "retail_price": 900
    },
    {
        "shipmentid": ObjectId("662be0d31e934e4f8fc5783e"),
        "vin": "V00016",
        "year": 2024,
        "make": "bintelli",
        "model": "beast",
        "ccs": 49,
        "color": "red",
        "purchase_price": 500,
        "retail_price": 900
    },
    {
        "shipmentid": ObjectId("662be0d31e934e4f8fc5783e"),
        "vin": "V00017",
        "year": 2024,
        "make": "bintelli",
        "model": "beast",
        "ccs": 49,
        "color": "red",
        "purchase_price": 500,
        "retail_price": 900
    },
    {
        "shipmentid": ObjectId("662be0d31e934e4f8fc5783e"),
        "vin": "V00018",
        "year": 2024,
        "make": "bintelli",
        "model": "beast",
        "ccs": 49,
        "color": "red",
        "purchase_price": 500,
        "retail_price": 900
    }
]);

// Insert shipment document for Vendor Genuine
db.shipments.insertOne({
    "_id": ObjectId(), // MongoDB generates _id automatically
    "orderDate": ISODate("2024-03-01T12:00:00Z"),
    "expectedDate": ISODate("2024-03-20T12:00:00Z"),
    "total": NumberInt(5000),
    "invoiceno": "G00001",
    "shipmentVendor": "Genuine",
    "ship_status": "ORDERED"
});

// Insert inventory documents for Vendor Genuine
db.inventory.insertMany([
    {
        "shipmentid": ObjectId(),
        "vin": "V00017",
        "year": 2024,
        "make": "genuine",
        "model": "buddy50",
        "ccs": 49,
        "color": "red",
        "purchase_price": 400,
        "retail_price": 1000
    },
    {
        "shipmentid": ObjectId(),
        "vin": "V00018",
        "year": 2024,
        "make": "genuine",
        "model": "buddy50",
        "ccs": 49,
        "color": "blue",
        "purchase_price": 400,
        "retail_price": 1000
    },
    {
        "shipmentid": ObjectId(),
        "vin": "V00019",
        "year": 2024,
        "make": "genuine",
        "model": "buddy50",
        "ccs": 49,
        "color": "red",
        "purchase_price": 400,
        "retail_price": 1000
    },
    {
        "shipmentid": ObjectId(),
        "vin": "V00020",
        "year": 2024,
        "make": "genuine",
        "model": "buddy50",
        "ccs": 49,
        "color": "red",
        "purchase_price": 400,
        "retail_price": 1000
    },
    {
        "shipmentid": ObjectId(),
        "vin": "V00021",
        "year": 2024,
        "make": "genuine",
        "model": "roughouse",
        "ccs": 49,
        "color": "red",
        "purchase_price": 500,
        "retail_price": 1100
    },
    {
        "shipmentid": ObjectId(),
        "vin": "V00022",
        "year": 2024,
        "make": "genuine",
        "model": "roughouse",
        "ccs": 49,
        "color": "blue",
        "purchase_price": 500,
        "retail_price": 1100
    },
    {
        "shipmentid": ObjectId(),
        "vin": "V00023",
        "year": 2024,
        "make": "genuine",
        "model": "roughouse",
        "ccs": 49,
        "color": "blue",
        "purchase_price": 500,
        "retail_price": 1100
    },
    {
        "shipmentid": ObjectId(),
        "vin": "V00024",
        "year": 2024,
        "make": "genuine",
        "model": "roughouse",
        "ccs": 49,
        "color": "blue",
        "purchase_price": 500,
        "retail_price": 1100
    }
]);

// Insert shipment document for Vendor IceBear
db.shipments.insertOne({
    "_id": ObjectId(), // MongoDB generates _id automatically
    "orderDate": ISODate("2024-03-10T12:00:00Z"),
    "expectedDate": ISODate("2024-04-12T12:00:00Z"),
    "total": NumberInt(2500),
    "invoiceno": "ICE00001",
    "shipmentVendor": "IceBear",
    "ship_status": "ORDERED"
});

// Insert inventory documents for Vendor IceBear
db.inventory.insertMany([
    {
        "shipmentid": ObjectId(),
        "vin": "VIN1003",
        "year": 2024,
        "make": "icebear",
        "model": "rocket",
        "ccs": 49,
        "color": "black",
        "purchase_price": 200,
        "retail_price": 800
    },
    {
        "shipmentid": ObjectId(),
        "vin": "VIN1004",
        "year": 2024,
        "make": "icebear",
        "model": "rocket",
        "ccs": 49,
        "color": "black",
        "purchase_price": 200,
        "retail_price": 800
    },
    {
        "shipmentid": ObjectId(),
        "vin": "VIN1005",
        "year": 2024,
        "make": "icebear",
        "model": "rocket",
        "ccs": 49,
        "color": "black",
        "purchase_price": 200,
        "retail_price": 800
    },
    {
        "shipmentid": ObjectId(),
        "vin": "VIN1006",
        "year": 2024,
        "make": "icebear",
        "model": "rocket",
        "ccs": 49,
        "color": "black",
        "purchase_price": 200,
        "retail_price": 800
    },
    {
        "shipmentid": ObjectId(),
        "vin": "VIN1007",
        "year": 2024,
        "make": "icebear",
        "model": "vision50",
        "ccs": 49,
        "color": "black",
        "purchase_price": 200,
        "retail_price": 800
    },
    {
        "shipmentid": ObjectId(),
        "vin": "VIN1008",
        "year": 2024,
        "make": "icebear",
        "model": "vision50",
        "ccs": 49,
        "color": "black",
        "purchase_price": 200,
        "retail_price": 800
    },
    {
        "shipmentid": ObjectId(),
        "vin": "VIN1009",
        "year": 2024,
        "make": "icebear",
        "model": "vision50",
        "ccs": 49,
        "color": "black",
        "purchase_price": 200,
        "retail_price": 800
    },
    {
        "shipmentid": ObjectId(),
        "vin": "VIN1010",
        "year": 2024,
        "make": "icebear",
        "model": "vision50",
        "ccs": 49,
        "color": "black",
        "purchase_price": 200,
        "retail_price": 800
    }
]);


// Group inventory documents by unique make and model combinations
db.inventory.aggregate([
    {
      $group: {
        _id: { make: "$make", model: "$model" }
      }
    }
  ]).forEach(function(group) {
    // Generate mechanic_notes based on make and model
    var mechanic_notes = "Assembly notes for " + group._id.make + " " + group._id.model + ": ";
    if (group._id.make.toLowerCase() === "bintelli") {
      mechanic_notes += "Back tire needs to be forced on until click is heard. Assemble gas casket first.";
    } else if (group._id.make.toLowerCase() === "genuine") {
      mechanic_notes += "Secure all screws tightly. Check for any loose parts.";
    } else if (group._id.make.toLowerCase() === "icebear") {
      mechanic_notes += "Handlebar assembly requires careful alignment. Double-check brake system.";
    } else {
      mechanic_notes += "General assembly instructions.";
    }
  
    // Insert a new document into the models collection
    db.models.insertOne({
      make: group._id.make,
      model: group._id.model,
      mechanic_notes: mechanic_notes
    });
  });
  