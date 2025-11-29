require("dotenv").config();
const mongoose = require("mongoose");

async function checkDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB:", mongoose.connection.name);

  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log("Collections in DB:");
  collections.forEach((c) => console.log(" -", c.name));

  const statuses = await mongoose.connection.db
    .collection("statuses")
    .find()
    .toArray();
  console.log("\nStatuses collection content:");
  console.log(statuses);

  const status = await mongoose.connection.db
    .collection("status")
    .find()
    .toArray();
  console.log("\nStatus collection content:");
  console.log(status);

  process.exit();
}

checkDB();
