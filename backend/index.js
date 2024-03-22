const express = require("express");
const cors = require('cors')
const authRoutes = require("./src/Routes/authRoutes");
const imageRoutes = require("./src/Routes/uploadRoute");
const path = require('path');

const app = express();

const port = 8080;

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));
console.log(path.join(__dirname, 'Uploads'))
app.use("/auth", authRoutes)
app.use("/image", imageRoutes)
app.get("/", function (req, res) {
    console.log("Inside the server")
  res.send("Hello World!");
});

app.listen(port);