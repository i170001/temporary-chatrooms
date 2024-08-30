const mongoose = require("mongoose");
const uri = process.env.DATABASE_URL;

mongoose.set("debug", true);
mongoose.connect(uri);

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});