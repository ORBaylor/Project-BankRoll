import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
dotenv.configDotenv();

console.log(process.env);
//console.log();
// const uri = `mongodb+srv://dbUser:${process.env.MONGODB_PASSWORD}@budgetdb.xqxjfvx.mongodb.net/?retryWrites=true&w=majority`;


// //process.env.MONGODB_PASSWORD
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {

// });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);