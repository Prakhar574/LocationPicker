const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://pkatiyar574:Ramji1234@cluster0.kynig5p.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


const addressSchema = new mongoose.Schema({
  houseNo: String,
  area: String,
  category: String,
  lat: Number,
  lng: Number,
});

const Address = mongoose.model("Address", addressSchema);


app.post("/api/addresses", async (req, res) => {
  const { houseNo, area, category, lat, lng } = req.body;
  try {
    const newAddress = new Address({ houseNo, area, category, lat, lng });
    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: "Error saving address" });
  }
});

app.put("/api/addresses/:id", async (req, res) => {
    const { id } = req.params;
    const { houseNo, area, category, lat, lng } = req.body;
    try {
      const updatedAddress = await Address.findByIdAndUpdate(
        id,
        { houseNo, area, category, lat, lng },
        { new: true } 
      );
      res.status(200).json(updatedAddress);
    } catch (error) {
      res.status(500).json({ message: "Error updating address" });
    }
  });
  
app.get("/api/addresses", async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching addresses" });
  }
});

app.get("/api/addresses/:id", (req, res) => {
    const { id } = req.params;
    Address.findById(id)  
      .then((address) => {
        if (address) {
          res.json(address);
        } else {
          res.status(404).send("Address not found");
        }
      })
      .catch((err) => res.status(500).send("Server error"));
  });
  
app.delete("/api/addresses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Address.findByIdAndDelete(id);
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting address" });
  }
});


app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running...");
});
