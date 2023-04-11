const express = require("express");
const mongoose = require("mongoose");

// Create an Express app
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/exp15", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

// Define a schema for the "users" collection
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Define a model for the "users" collection
const User = mongoose.model("User", userSchema);

// Define routes for CRUD operations

// Create a new user
app.post("/users", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  await user.save();
  res.send(user);
});

// Read all users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Read a single user by ID
app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User not found");
  res.send(user);
});

// Update a user by ID
app.put("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    },
    { new: true }
  );
  if (!user) return res.status(404).send("User not found");
  res.send(user);
});

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return res.status(404).send("User not found");
  res.send(user);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
