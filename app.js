const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const admin = require("./routes/admin_r");
const client = require("./routes/client_r");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// database connection
const dbURI = "mongodb://localhost:27017/barangayOfficial73DB";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.use(client);
app.use(admin);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
