const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://cs120:hleIcqccff99VSJc@cluster0.bmluvqb.mongodb.net/mopedmark?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("mopedmark");
        const clients = database.collection("clients");
        const sales = database.collection("sales");

        const clientDoc = await clients.findOne();
        if (!clientDoc) {
            console.log("No clients found in the database.");
            return;
        }

        const saleDoc = {
            client_id: clientDoc._id,
            sale_price: 20000.00,
            down_payment_amount: 5000.00,
            date_initiated: new Date("2024-04-01T00:00:00Z"),
            date_completed: new Date("2024-04-10T00:00:00Z")
        };

        const result = await sales.insertOne(saleDoc);
        console.log(`A sales document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);