//create express server here
const LogRocket = require('logrocket');
LogRocket.init('yrd0wl/crm-rest-api');
const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const session = require("express-session")
const app = express();
app.use(session({
    secret: 'oneboy',
    saveUninitialized: true,
    resave: true
}));
const passport = require("passport");
const {
    loginCheck
} = require("./auth/passport")


app.use(express.urlencoded({ extended: false }));



const PORT = process.env.PORT || 4111;


//mongodb connection

const db = process.env.MONGOLAB_URI;

//async try catch for connection
async function connection() {

    mongoose.connect(db, {
        useUnifiedTopology: true, // what is unified topology in mongoose?
        useNewUrlParser: true // why am I including useNewURLParser
    }, () => {
        try {
            console.log("WE HAVE CONNECTED TO MONGODB")
        } catch {
            console.error("could not connect to Mongo DB! I'm Sorry")
        }


    })

}
connection()

app.use(passport.initialize());
app.use(passport.session());

//set the view engine to use .ejs
//defined the root route to use what’ s in [login]--> under routes
app.set("view engine", "ejs"); // what does app.set() do for ejs templating?

app.use("/", require("./routes/login"));

//run our server on port 4111
app.listen(PORT, () => {
    console.log(`the server is running at port ${PORT}`)
})