const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
// const logger = require("./middleware/logger");
const members = require("./Members");

const app = express();

// -----------------A simple example
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });
// __________________________________

// Init middleware
// app.use(logger);

// HandleBards Middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) =>
  res.render("index", { title: "Express Handlebars Template", members })
);

// Set a static folder
app.use(express.static(path.join(__dirname, "public")));
// Serving API
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.port || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
