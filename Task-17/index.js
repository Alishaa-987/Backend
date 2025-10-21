const express = require("express");
const app = express();
const port = 8005;

const students = require("./MOCK_DATA.json");
// This is middleware

app.use(express.json());
// For getting all the users
app.get("/students", (req, res) => {

  //.includes(req.query.name.toLowerCase()) → check karta hai ke name ke andar search word aata hai ya nahi
  if(req.query.name){
    return res.json(students.filter(student => student.name.toLowerCase().includes(req.query.name.toLowerCase())))
  }
  res.json(students);
  console.log(students);
});

// For getting a single user with ID
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({ messaage: "Student not found" });
  }
  res.json(student);
});
// For creating a new student
app.post("/students", (req, res) => {
  const data = req.body;

  if (!data.id) {
    data.id = Date.now();
  }
  students.push(data);
  res.status(201).json(data);
});

// update student by put request means updating whole data
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((student) => student.id == id);
  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }
  students[index] = { ...req.body, id };
  res.json({
    message: "Student data updated successfully",
    data: students[index],
  });
});
// for deleting a student
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((student) => student.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }
  students.splice(index, 1);
  res.json({ message: "Student deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
