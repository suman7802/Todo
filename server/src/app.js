require("dotenv").config();
const cors = require("cors");
const express = require("express");
const parser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const connectDB = require("./database/db");
const userRouter = require("./routes/user.route");
const todoRouter = require("./routes/todo.route");
const validateToken = require("./middleware/validateToken");

const app = express();

app.use(parser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/todo", validateToken, todoRouter);

async function startServer() {
  connectDB();
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}
startServer();
