const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router=require("./Router/Searchrouter")
const bodyparser=require("body-parser")
const cors= require("cors")
const multer=require("multer");
const path=require("path")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
dotenv.config();
mongoose
  .connect(process.env.mongo_uri)
  .then(() => {
    console.log("data base connected");
  })
  .catch((error) => console.log("error while database connecting", error));

const port = process.env.PORT || 8085;
mongoose.set('bufferTimeoutMS', 20000); // 20 seconds timeout
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors())
app.listen(port, () => {
  console.log(`server running under ${port}`);
});



app.use("/a", (req, res) => {
  res.status(201).json({ message: "WELCOMEs" });
});
app.use("/api",router)
app.use("/upload", express.static("upload"));

