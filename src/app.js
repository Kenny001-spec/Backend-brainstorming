const express = require("express");
//Step 1: We are going to require mongoose after it has been install
const mongoose = require("mongoose");
const app = express();
mongoose.set('strictQuery', false);

// Adding middleware which will be able to passed data through the body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 5000;

// JSON Destructure
const customers = [
    {
        "name": "Hassan",
        "industry": "music"
    },
    {
        "name": "John",
        "industrty": "networking"

    },
    {
        "name": "Godwin",
        "industry": "sports medicine"
    }
];

app.get('/', (req, res) => {
    res.send('Welcome');
});
// Creating an end point, That's what happpen when the user visit that URL
app.get('/api/customers', (req, res) => {   // Get is to retrieve data
    res.send({"customers": customers});
})

app.post('/api/customers', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.post('/', (req, res) => {  //Post is going to be used to add data.
    res.send('This is a post request');
})

// Step 2: To use Mongoose we're going to define an async function
const start = async() => {
    try{
        await mongoose.connect('mongodb+srv://KEHINDE01:Harbiodun01@cluster0.r1nwvs8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');   // Here is where to pass the connection string

        app.listen(PORT, () => {
            console.log("App listening on port " + PORT);
        });
    } catch(err) {
        console.log(err.message)
        
    }
};
start();  // This is called invoke




