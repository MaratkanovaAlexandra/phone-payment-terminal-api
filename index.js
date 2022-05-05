const express = require("express");
const fs = require("fs");
const cors = require("cors");

const PORT = process.env.PORT || 5050;
const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/providers", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db.json"));
  res.status(200).json(data);
});

app.get("/paths", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db.json"));
  const paths = data.map((provider) => provider.id.toString());
  res.status(200).json(paths);
});

app.get("/providers/:id", (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync("./db.json"));
  const provider = data.find((provider) => provider.id.toString() === id);
  res.status(200).json(provider);
});

app.post("/providers/create", (req, res) => {
  const randomNumder = Math.floor(Math.random() * 10);
  if (randomNumder % 2 === 0) res.status(500).json({ message: "Server error" });
  
  else {
    const { name, icon } = req.body;
    const data = JSON.parse(fs.readFileSync("./db.json"));
    data.push({
      id: data.length,
      name,
      icon,
    });
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 4));
    res.status(200).json({ message: "Success" });
  }
});

app.post("/pay/:id", (req, res) => {
  const randomNumder = Math.floor(Math.random() * 10);
  if (randomNumder % 2 === 0) res.status(500).json({ message: "Server error" });
  else res.status(200).json({ message: "Success" });
});

app.listen(PORT, () => console.log(PORT));
