//create express server here

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4111;

app.listen(PORT, () => {
    console.log(`the server is running at port ${PORT}`)
})