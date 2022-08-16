const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.get("/api", (req, res) => {
    res.json({"message":  "Hello from server!"})
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/src/index.js")
});

app.listen(PORT, ()=> {
  console.log(`Server is listening on ${PORT}`)
});

