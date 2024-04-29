const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

class InventoryModel {
  constructor(uri) {
    this.client = new MongoClient(uri);
    this.database = this.client.db("mopedmark");
    this.inventory = this.database.collection("inventory");
  }
  async connect() {
    await this.client.connect();
  }
  async close() {
    await this.client.close();
  }

  async uploadBulkInventory(inventoryData) {
    console.log("uploading inventory atempt");
    await this.connect();
    try {
      await this.inventory.insertMany(inventoryData);
      console.log("All inventory data uploaded successfully");
    } catch (error) {
      console.error("Error uploading inventory data:", error);
      throw error;
    }
    await this.client.close();
  }

  async getInventoryFromShipment(shipID) {
    console.log("inventory model running a query");
    console.log(typeof shipID);
    console.log("ship id " + shipID.toString());
    await this.connect();
    try {
      // const objectId = new ObjectId(shipID);
      // const data = await this.inventory.find({ shipmentID: shipID }).toArray();
      const cursor = await this.inventory.find({
        shipmentID: new ObjectId(shipID),
      });
      const data = await cursor.toArray();

      if (data.length === 0) {
        console.log("No inventory found for shipment:", shipID);
        return null;
      }
      console.log("Found inventory");
      console.log("inventory found by model: ", data);
      return data;
    } catch (error) {
      console.error("Error retrieving inventory :", error);
      throw error;
    } finally {
      await this.client.close();
    }
  }

  async getInventory() {
    console.log("inventory model is retrieving inventory");
    await this.connect();
    try {
      const cursor = this.inventory.find();
      const data = await cursor.toArray();

      if (data.length === 0) {
        console.log("No inventory found for shipment");
        return null;
      }
      console.log("Found inventory");
      return data;
    } catch (error) {
      console.error("Error retrieving inventory :", error);
      throw error;
    } finally {
      await this.client.close();
    }
  }

  async getSingleInventory(id) {
    console.log("inventory model is retrieving inventory");
    await this.connect();
    try {
      // Assuming `inventoryCollection` is your MongoDB collection
      const inventoryItem = await this.inventory.findOne({
        _id: new ObjectId(id),
      });
      return inventoryItem;
    } catch (error) {
      console.error("Error retrieving single inventory:", error);
      throw error; // You might want to handle this error appropriately in your application
    } finally {
      await this.client.close();
    }
  }

  async getInventoryByMakeModel(make, model) {
    console.log("Inventory model is retrieving inventory for " + make + model);
    await this.connect();
    try {
      const cursor = this.inventory.find({ make: make, model: model });
      const data = await cursor.toArray();
      if (data.length === 0) {
        console.log("No inventory found");
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error retrieving inventory:", error);
      throw error;
    } finally {
      await this.client.close();
    }
  }

  async updateImage(id, newPath) {
    console.log("UPDATING MODEL IMAGE from path received", newPath);
    newPath = newPath.replace(/^public(?=\/)/, "");

    await this.connect();
    try {
      const inventoryItem = await this.inventory.findOne({
        _id: new ObjectId(id),
      });
      if (inventoryItem && inventoryItem.image !== undefined) {
        console.log("ID OF ITEM BEING UPDATED: ", inventoryItem._id);
        const currentPath = inventoryItem.image;
        const result = await this.inventory.updateOne(
          { _id: new ObjectId(id) },
          { $set: { image: newPath } }
        );
        console.log("UPDATED MONGO FILE PATH TO: " + newPath);
        console.log(
          `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
        );
      } else {
        console.log("Inventory item not found or doesn't have an image field.");
      }
    } catch (error) {
      console.error("error updating image", error);
      throw error;
    } finally {
      await this.client.close();
    }
  }

  async updateSaleIdByVin(vin, saleId) {
    await this.connect();
    try {
      const inventoryItem = await this.inventory.findOne({ vin: vin });
      if (inventoryItem) {
        // If sale_id already exists, update it; otherwise, add sale_id
        if (inventoryItem.sale_id) {
          const result = await this.inventory.updateOne(
            { vin: vin },
            { $set: { sale_id: saleId } }
          );
          console.log(`Updated sale_id for VIN ${vin}`);
        } else {
          const result = await this.inventory.updateOne(
            { vin: vin },
            { $set: { sale_id: saleId } }
          );
          console.log(`Added sale_id for VIN ${vin}`);
        }
      } else {
        console.log(`Inventory item not found for VIN ${vin}`);
      }
    } catch (error) {
      console.error("Error updating sale_id by VIN:", error);
      throw error;
    } finally {
      await this.client.close();
    }
  }

  async getTotalInventory() {
    await this.connect();
    const totalInventory = await this.inventory.countDocuments();
    return totalInventory;
  }

  async getScooterDetailsBySaleIds(saleIds) {
    // console.log(saleIds);
    await this.connect();

    const inventoryItems = await this.inventory
      .find({ sale_id: { $in: saleIds } })
      .toArray();
    // console.log("Inventory data retrieved:", inventoryItems);
    return inventoryItems;
  }

  async updateStatusById(id, newStatus) {
    await this.connect();
    try {
      const inventoryItem = await this.inventory.findOne({
        _id: new ObjectId(id),
      });
      if (inventoryItem) {
        const result = await this.inventory.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status_id: newStatus } }
        );
        console.log(`Updated status for item with ID ${id} to ${newStatus}`);
      } else {
        console.log(`Inventory item not found for ID ${id}`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    } finally {
      await this.client.close();
    }
  }
}

module.exports = InventoryModel;
