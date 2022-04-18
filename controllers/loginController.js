//js
// why do I need this if I already have ejs?
//For Register Page
const passport = require("passport");
const User = require("../models/users")
const bcrypt = require('bcryptjs')
    //js
const loginUser = (req, res) => {
    const { email, password } = req.body;
    //Required
    if (!email || !password) {
        console.log("Please fill in all the fields");
        res.render("login", {
            email,
            password,
        });
    } else {
        passport.authenticate("local", {
            successRedirect: "/dashboard",
            failureRedirect: "/login",
            failureFlash: true,
        })(req, res);
    }
};
// registerUser for verifying if new profile account can be created
const registerUser = (req, res) => {
        const { name, email, location, password, confirm } = req.body
        if (!name || !email || !location || !password || !confirm) {
            res.status(404).send("You Missed A Value Dickhead! lol")
            console.log("You Left A Field Empty Dickhead! lol")
        }
        //Confirm Passwords
        if (password !== confirm) {
            console.log("Password must match");
        } else {
            //Validation
            User.findOne({ email: email }).then((user) => {
                if (user) {
                    console.log("email exists");
                    res.render("register", {
                        name,
                        email,
                        password,
                        confirm,
                    });
                } else {
                    //Validation
                    const newUser = new User({
                        name,
                        email,
                        location,
                        password,
                    });
                    //Password Hashing
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(res.redirect("/login"))
                                .catch((err) => console.log(err));
                        })

                    )
                }
            })
        }
    }
    //registerView -> renders the register page for new users without an existing account.
const registerView = (req, res) => { //middleware for when register endpoint in routes folder is hit.  gets hit
        res.render("register", {}); // render is a method for the response object. 
    }
    // For ----> returning users who already have an existing account.
const loginView = (req, res) => {

    res.render("login", {});
}


//Here, registerView and loginView render the register.ejs and login.ejs view, respectively.
//Both are exported.
module.exports = {
    registerView,
    loginView,
    loginUser,
    registerUser
};