const express = require("express");
const app = express();

// Adding middleware which will be able to passed data through the body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 5000;

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

app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});


