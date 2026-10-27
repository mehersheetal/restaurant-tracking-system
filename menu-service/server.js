const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb://localhost:27017/restaurantdb"
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const Menu = mongoose.model("Menu", {
  name: String,
  price: Number
});

app.get("/menu", async (req, res) => {
  const menu = await Menu.find();
  res.json(menu);
});

app.post("/menu", async (req, res) => {
  const item = await Menu.create(req.body);
  res.json(item);
});

app.listen(3000, () => {
  console.log("Menu Service running on port 3000");
});