require("dotenv").config();
require("colors");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { errorHandler } = require("./middleware/error");
const usersRouter = require("./routes/users");
const contactRouter = require("./routes/contact");
const orgRouter = require("./routes/organisation");
const eventRouter = require("./routes/EventRoute");
const donateRouter = require('./routes/DonationRoute')
const connectDB = require("./config/db");
const path = require("path");

// app config
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json({ limit: '50mb' }))

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(errorHandler);


// endpoints
app.use("/api/donations", donateRouter)
app.use("/api/events", eventRouter)
app.use("/api/users", usersRouter);
app.use("/api/contact",contactRouter)
app.use("/api/organisation",orgRouter)

// DB config
connectDB()

// Server frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("Please set to production");
  });
}

// listner
app.listen(PORT, () => console.log(`app runnig on ${PORT}`.blue.bold));
