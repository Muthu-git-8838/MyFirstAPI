const mongoose = require("mongoose");
const validator = require("validator");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  phone: {
    type: Number,
    required: true,
    min: 10,
    unique: [true, "Phone Number already found"],
  },
  role: {
    type: String,
    required: true,
    min: 5,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email Already exist"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error();
      }
    },
  },
});

const Employee = new mongoose.model("employee", employeeSchema);

module.exports = Employee;
