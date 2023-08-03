require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user_routes");
const helperRoute = require("./routes/helper_routes");
const employerRoute=require("./routes/employer_routes")
const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.static("public"));

app.use("/user", userRoute);
app.use("/helper", helperRoute);
app.use("/employer", employerRoute);
app.listen(PORT, () => {
  console.log("server started on port", PORT);
});
