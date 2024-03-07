import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

//Port number initialize:
let PORT = process.env.PORT || 5000;
//Mongodb conncetion initializing:
let uri = process.env.MONGODB_CONECTION_STRING;

//App Initialize:
let app = express();
//Home route:
app.get("/", (req, res) => {
  res.send("Server is working");
});
//Connection to database :
mongoose
  .connect(uri)
  .then(() => {
    console.log("Mongoose Connected Sucessfully");
    try {
      //Application listening port number
      app.listen(PORT, () => {
        console.log(`Server running ${PORT} port number`);
      });
    } catch (err) {
      console.log("Server is not conected");
    }
  })
  .catch((error) => {
    console.log("Mongoose conncetion failed ", error.message);
  });
