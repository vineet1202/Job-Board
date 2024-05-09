const express = require("express");
const { connectToDb } = require("./connection");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/user");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

//connection
connectToDb;

//Middleware plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json("Server running");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
