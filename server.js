const express = require("express");
const path = require("path");
const cors = require("cors");
require("./database/Database");
const bodyParser = require("body-parser");
const app = express();
const adminRoute = require("./routes/admin-route");
const participantRoute = require("./routes/participant-route");
const managerRoute = require("./routes/manager-route");
const authRoute = require("./routes/auth-route");
const commonRoute = require("./routes/common-route");
const errorMiddleware = require("./middlewares/error-middleware");
const cookieParser = require("cookie-parser");
const ErrorHandler = require("./utils/error-handler");
const { authRole } = require("./middlewares/auth-middleware");
require("dotenv").config();

//PORT
const PORT = 5500;

//Cors Option
const corsOption = {
  credentials: true,
  origin: [
    "http://localhost:4000",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:8000",
  ],
};

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/admin", adminRoute);
app.use("/participant", participantRoute);
app.use("/manager", managerRoute);
app.use("/auth", authRoute);
app.use("/common", commonRoute);
app.use("/storage", express.static("storage"));

//MiddleWare for error
app.use(errorMiddleware);

// Server Listining
app.listen(PORT, (error) => {
  if (error) {
    console.error(error.message);
    return;
  }

  console.log(`http://localhost:${PORT}`);
});
