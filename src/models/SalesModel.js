const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

class SalesModel {
  constructor(uri) {
    this.client = new MongoClient(uri);
    this.database = this.client.db("mopedmark");
    this.sales = this.database.collection("sales");
  }

  async connect() {
    await this.client.connect();
  }

  async getSalesNum() {
    await this.connect();
    const result = await this.sales
      .aggregate([
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$sale_price" },
            totalDownPayments: { $sum: "$down_payment_amount" },
          },
        },
      ])
      .toArray();
    return result[0] || { totalSales: 100, totalDownPayments: 100 };
  }

  async getAllSales() {
    await this.connect();
    return await this.sales.find({}).toArray();
  }

  async close() {
    await this.client.close();
  }

  async createSale(saleData) {
    await this.connect();
    const result = await this.sales.insertOne(saleData);
    console.log("Sale created with ID:", result.insertedId);
    await this.client.close();
    return { _id: result.insertedId };
  }

  // updated sale_id filter to _id
  async getSale(saleID) {
    try {
      await this.connect();
      const sale = await this.sales.findOne({ _id: new ObjectId(saleID) });
      return sale;
    } finally {
      await this.client.close();
    }
  }

  //Shuo added get sales by client ID function

  async getSalesByClientId(clientId) {
    await this.connect();
    try {
      const salesData = await this.sales
        .find({ client_id: clientId })
        .toArray();
      return salesData;
    } finally {
      await this.close();
    }
  }
  async getTotalSales() {
    await this.connect();
    const totalSales = await this.sales.countDocuments();
    return totalSales;
  }

  async getSalesByClientIds(clientIds) {
    // console.log("Client IDs:", clientIds);
    await this.connect();

    const salesData = await this.sales
      .find({ client_id: { $in: clientIds } })
      .toArray();
    // console.log("Sales data retrieved:", salesData);
    return salesData;
  }

}

module.exports = SalesModel;
