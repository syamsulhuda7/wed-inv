// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI!;
// const options = {};

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// declare global {
//   var _mongoClientPromise: Promise<MongoClient>;
// }

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please add MONGODB_URI to your .env.local");
// }

// if (process.env.NODE_ENV === "development") {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;

import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGODB_URI!;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const clientPromise = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await clientPromise.connect();
    // Send a ping to confirm a successful connection
    await clientPromise.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await clientPromise.close();
  }
}
run().catch(console.dir);

export default clientPromise;
