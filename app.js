import bodyParser from "body-parser";
import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "./db/funcs.js";

const app = express();
const port = 5000;
app.use(bodyParser.json());
app.all("*", (req, res, next) => {
  console.log(req.url, " - ", req.method);
  next();
});
app.get("/api/users", (req, res) => {
  const users = getUsers();
  res.status(200).send(users);
});
app.post("/api/users", (req, res) => {
  const { name, fName, lName } = req.body;
  if (!fName || !lName || !name) {
    return res.status(400).json({ message: "All fields not provided!" });
  }
  return res.status(201).json(createUser(name, fName, lName));
});
app.get("/api/users/:id", (req, res) => {
  const user = getUser(req.params.id);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(400).json({ message: "User not found" });
});
app.delete("/api/users/:id", (req, res) => {
  deleteUser(req.params.id);
  return res.status(202).json({ message: "User deleted successfully" });
});
app.put("/api/users/:id", (req, res) => {
  const { name, fName, lName } = req.body;
  if (!fName || !lName || !name) {
    return res.status(400).json({ message: "All fields not provided!" });
  }
  return res.status(200).json(updateUser(req.params.id, name, lName, fName));
});

app.all("*", function (req, res) {
  return res.status(404).json({ message: "Page not found!" });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("Server listening on port " + port);
  console.log("http://localhost:" + port);
});
