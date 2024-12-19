const express = require("express");
const app = express();
const cors = require("cors")

app.use(cors({origin: "*"}))
app.use(express.json());

const PORT = 8080;

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/apilebconcoin", {})
  .then(console.log("Connected to MongoDB"));

const userRoutes = require("./src/Routes/userRoute");
const announcementRoutes = require("./src/Routes/announcementRoute");
app.use("/api/users", userRoutes);
app.use("/api/announcements", announcementRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


