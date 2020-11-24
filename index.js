const express = require("express");
const morgan = require('morgan');
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8080;


//DB Config
mongoose.connect('mongodb://localhost:27017/profile', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then((db) => {
    console.log("db connected");
}).catch((err) => {
    console.log(err);
})



const adminC = require('./controller/admincontroller');
app.use('/admin', adminC);



app.listen(port, (err) => {
    if (err) {
        return console.log("ERROR", err)
    }
    console.log("running at port :" + port);
})