const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/notes", require("./routers/noteRoute"));
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
})