const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/employee-api")
  .then(() => {
    console.log("SuccessFully connected to server");
  })
  .catch((err) => {
    console.log(err);
  });

//   module.exports
