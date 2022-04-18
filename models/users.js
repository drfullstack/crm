//Creating a model for user registration
const mongoose = require("mongoose");

// I must review new mongoose.Schema({}) vs new mongoose.Model({})
//user schema class being created without class keyword or a constructor. Similar to pydantic. 

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    user: { type: String, required: true },
    body: { type: String, required: true }
})
const UserSchema = new mongoose.Schema({

    name: { // name is the entity that we a describing as an object. 
        type: String, // String is  a prototype in mongoose similar to Pydantic from python -> type is the expect req data type
        required: true, // required is similar to optional in fastAPI -> it will have a simple boolean value. 
    },
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,

    },
    location: {
        type: String,
        default: "New York",
    },
    date: {
        type: Date,
        default: Date.now, // default is an alternative to required which will make SURE to give a value to the entity we are describing. 
    },
})

//why did I export User instead of UserSchema?
//What does the new mongoose.Model("User", userSchema) do?
const Post = new mongoose.Model("Post", PostSchema)
const User = new mongoose.Model("User", UserSchema)
module.exports = { User, Post };

/*These are the fields we want to insert into the database
 whenever a new user registers through the Registration page. 
 We can store a:
1- name, 
2- password,
3- email address,
4- give users a default location of New York, 
5- include a timestamp when the registration completes.*/