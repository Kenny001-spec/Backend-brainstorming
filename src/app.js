const express = require("express");
//Step 1: We are going to require mongoose after it has been install
const mongoose = require("mongoose");

// require dotenv to use the port, after dotenv has been install
// const dotenv = require("dotenv");
// dotenv.config();

// require our new customer file that we createad
const Customer = require("./models/customer");
const app = express();
mongoose.set("strictQuery", false);

// Adding middleware which will be able to passed data through the body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 5000;
const CONNECTION = process.env.CONNECTION;

// JSON Destructure
const customers = [
  {
    name: "Hassan",
    industry: "music",
  },
  {
    name: "John",
    industrty: "networking",
  },
  {
    name: "Godwin",
    industry: "sports medicine",
  },
];

// Creating a customer and send it to the user
const customer = new Customer({
  name: "Godwin",
  industry: "marketing",
});

app.get("/", (req, res) => {
  res.send(customer);
});
// Creating an API endpoints, That's what happpen when the user visit that URL
app.get("/api/customers", async (req, res) => {
  // Get is to retrieve data
  const result = await Customer.find();
  res.send({ customers: result });
});

app.post("/api/customers", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post("/", (req, res) => {
  //Post is going to be used to add data.
  res.send("This is a post request");
});

// Step 2: To use Mongoose we're going to define an async function
const start = async () => {
  try {
    await mongoose.connect(CONNECTION); // Here is where to pass the connection string

    app.listen(PORT, () => {
      console.log("App listening on port " + PORT);
    });
  } catch (err) {
    console.log(err.message);
  }
};
start(); // This is called invoke
