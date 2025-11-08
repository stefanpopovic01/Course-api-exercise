require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const productRouter = require("./routes/products");
const categoryRotuer = require("./routes/category");
const manufacturerRouter = require("./routes/manufacturer");
const ratingRouter = require("./routes/ratings");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Povezan sa bazom."))
.catch(() => console.log("Nije povezan sa bazom."));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Pocetna. ");
})

app.use("/products", productRouter);
app.use("/categories", categoryRotuer);
app.use("/manufacturer", manufacturerRouter);
app.use("/ratings", ratingRouter);


app.listen(3000);