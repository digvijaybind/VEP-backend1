const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://digvijay:129389@cluster0.hgtyi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected SuccesFull ..."))
  .catch((err) => console.log("Connection Failed : " + err));

module.exports = mongoose;
