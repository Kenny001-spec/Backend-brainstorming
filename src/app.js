const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer');
require('dotenv').config(); // Ensure dotenv is loaded correctly

const app = express();
mongoose.set("strictQuery", false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const CONNECTION = process.env.CONNECTION;

const customers = [
  {
    name: "Hassan",
    industry: "music",
  },
  {
    name: "John",
    industry: "networking",
  },
  {
    name: "Godwin",
    industry: "sports medicine",
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to the API"); // Fixed response
});

app.get("/api/customers", async (req, res) => {
  try {
    const result = await Customer.find();
    res.json({ customers: result }); // Send JSON response
  } catch (e) {
    res.status(500).json({ error: e.message }); // Handle server error
  }
});

app.get('/api/customers/:id/:test', async(req, res) => {
  res.json({
    requestParams: req.params,
    requestQuery: req.query
  });
});

app.post("/api/customers", async (req, res) => {
  try {
    console.log(req.body);
    const customer = new Customer(req.body);
    await customer.save(); // Wait for the customer to be saved
    res.status(201).json({customer}); // Send response with created customer
  } catch (e) {
    res.status(400).json({ error: e.message }); // Handle client error
  }
});

app.post("/", (req, res) => {
  res.send("This is a post request");
});

const start = async () => {
  try {
    await mongoose.connect(CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
  }
};

start();
