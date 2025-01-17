const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const app = express();

const DB = "mongodb+srv://htonnycarlos:NerZIvX9BXKUssbv@clusteramazonclone.7g98e.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAmazonClone";



// middleware
app.use(express.json());

// Connections
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to mongodb Successfully");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`The app is listening to ${PORT}`);
});