require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const cors = require('cors');
const authroutes = require("./routes/authorizationRouter");
const booksRoutes = require("./routes/booksRoute");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

const app = express();

app.use(express.json()); 
app.use(cors())

app.use("/api/v1/auth", authroutes);
app.use("/", booksRoutes);

app.use(
  "*",
  catchAsync(async (req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);


app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 5000;

app.listen(PORT, () => console.log("Server running in the localhost: ", PORT));
