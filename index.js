const express = require("express");
const jwt = require("jsonwebtoken");
const { middleware } = require("./middleware");

const app = express();
app.use(express.json());

const notes = [];
const users = [{}];
app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(403).json({ message: "user with this username exisits" });
  }
  users.push({ username, password });
  res.json({ message: "you have signed up" });
});


app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const userExists = users.find(
    (user) => user.username === username && user.password === password,
  );
  if (!userExists) {
    res.status(403).json({ message: "the user does not exists" });
    return;
  }

  const token = jwt.sign({ username: username }, "shubham96");
  res.json({ token: token });
});
app.post("/notes", middleware, function (req, res) {
  const username = req.username;
  const note = req.body.note;
  notes.push({ note, username });
  res.json({
    message: "DOne",
  });
});

app.get("/notes", middleware, function (req, res) {
  const username = req.username;
  const usernotes = notes.filter((note) => note.username === username);
  res.json({ notes: usernotes });
});
app.get("/", (req, res) => {
  res.sendFile("/Users/shubham/Desktop/code/auth_notes/frontEnd/index.html");
});
app.get("/signin", (req, res) => {
  res.sendFile("/Users/shubham/Desktop/code/auth_notes/frontEnd/signin.html");
});
app.get("/signup", (req, res) => {
  res.sendFile("/Users/shubham/Desktop/code/auth_notes/frontEnd/signup.html");
});
app.listen(3000);
