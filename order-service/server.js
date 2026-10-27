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

const Order = mongoose.model("Order", {
  customerName: String,
  itemName: String,
  quantity: Number,
  status: String
});

app.post("/orders", async (req, res) => {

  const order = await Order.create({
    ...req.body,
    status: "Pending"
  });

  res.json(order);
});

app.get("/orders", async (req, res) => {

  const orders = await Order.find();

  res.json(orders);
});

app.get("/orders/:id", async (req, res) => {

  const order =
    await Order.findById(req.params.id);

  res.json(order);
});

app.put("/orders/:id", async (req, res) => {

  const order =
    await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(order);
});

app.listen(3001, () => {
  console.log(
    "Order Service running on port 3001"
  );
});