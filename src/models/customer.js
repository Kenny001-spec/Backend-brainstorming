const mongoose = require('mongoose');


// Defining a model, and how to define a model is by creating a schema
const customerSchema = new mongoose.Schema({   // customer schema is a new mongoose dot schema
    name: String,
    industry: String
});  

module.exports = mongoose.model('Customer', customerSchema)   // association from the structure of the code above

