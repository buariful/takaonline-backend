const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// middlewares
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "backend/config.env" });

app.use(cors());
app.use(express.json());

// ========= uri ==========
const uri = `mongodb+srv://buariful:xbG8V6kj1UTflwNW@cluster0.qrazbkz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   serverApi: ServerApiVersion.v1,
});

// api and connecting database
async function run() {
   try {
      await client.connect();
      const userCollection = client.db("takaonline").collection("user");

      // get all the users
      app.get("/api/v1/users", async (req, res) => {
         const query = {};
         const users = await userCollection.find(query).toArray();
         res.send(users);
      });

      // upload a user
      app.post("/api/v1/user", async (req, res) => {
         const userInfo = req.body;
         const result = await userCollection.insertOne(userInfo);
         res.send(result);
      });
   } finally {
   }
}
run().catch(console.dir);

// ========== default run ========
app.get("/", (req, res) => {
   res.send("Taka online server!");
});
app.listen(port, () => {
   console.log(`Taka online on port ${port}`);
});
