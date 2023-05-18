const express = require("express");
const app = express();
require("./db/conn");
const Employee = require("./model/employee");

const port = process.env.PORT || 8080;

app.use(express.json());

//  Handling POST request using PROMISES

// app.post("/employee", (req, res) => {
//   const ot = {
//     message: `${req.body.name} Data Added successfully`,
//     credits: "Thanks for using Our API",
//     apiAuthor: "MUTHUMANI S",
//   };
//   const user = new Employee(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(ot);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

// Handing POST request using async,await
app.post("/employee", async (req, res) => {
  try {
    const user = new Employee(req.body);
    await user.save();
    res.status(201).send({ message: "Data Added Successfully" });
  } catch (e) {
    res.status(400).send({
      error_message: `email or phone number is already found in our DataBase`,
    });
    // res.status(400).send(e);
  }
});

// Handling GET request using async, await
// Fetch all employees data
app.get("/employee", async (req, res) => {
  try {
    const employeeData1 = await Employee.find();
    res.status(200).send(employeeData1);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Fetch a employee data by _id
app.get("/employee/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const employeeData2 = await Employee.findById(_id);
    if (!employeeData2) {
      return res.status(404).send({ message: "Data Not Found" });
    } else {
      res.status(200).send(employeeData2);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

// Fetch a employee data by name
// app.get("/employee/:name", async (req, res) => {
//   try {
//     const name = req.params.name;
//     const employeeData3 = await Employee.findOne({ name: name });
//     if (!employeeData3) {
//       res.status(404).send({ message: "data NOT found" });
//     } else {
//       res.status(200).send(employeeData3);
//     }
//   } catch (e) {
//     res.status(500).send(e);
//     console.log(employeesData);
//   }
// });

//

// Update a employee deta by id
app.patch("/employee/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const UpdateData = await Employee.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!UpdateData) {
      return res.status(404).send({ message: "Data NOT Found" });
    } else {
      res.send(UpdateData);
    }
  } catch (e) {
    res.send(e);
  }
});

// Delete a employee data by id
app.delete("/employee/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteData = await Employee.findByIdAndDelete(_id);
    if (!deleteData) {
      return res.status(404).send({ message: "Data NOT Found" });
    } else {
      res.status(200).send({ message: "Employee Data Deleted Successfully" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
