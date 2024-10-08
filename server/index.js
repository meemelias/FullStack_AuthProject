const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// ROUTES


// login & registration routes
app.use("/auth",require("./routes/jwtAuth")) 

// dashboard route 
app.use("/dashboard",require('./routes/dashboard'))

app.listen(5000,() => {
    console.log("server is up and running");

});
