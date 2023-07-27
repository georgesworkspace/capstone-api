require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const warehouseRoute=require('./routes/routes');
const inventoryRoute=require('./routes/inventories');
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());