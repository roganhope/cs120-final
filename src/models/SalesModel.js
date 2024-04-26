const { MongoClient } = require("mongodb");

class SalesModel {
  constructor(uri) {
    this.client = new MongoClient(uri);
    this.database = this.client.db("mopedmark");
    this.sales = this.database.collection("sales");
  }

  async connect() {
    await this.client.connect();
  }

  async getTotalSales() {
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
    return result[0] || { totalSales: 0, totalDownPayments: 0 };
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
  }
    // louyou can you get this to work?
    async getSale(saleID) {
        await this.connect();
        const sale = await this.sales.findOne({ sale_id: saleID });
        await this.client.close();
    }

}

module.exports = SalesModel;
