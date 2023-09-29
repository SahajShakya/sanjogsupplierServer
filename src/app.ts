import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./middleware/error-handler";
import dbconnection from "./db/config";
import startupRoutes from "./startup/startup-routes";

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json())
startupRoutes(app)

app.get("/api", (req, res) => {
  console.log("api")
  res.send({ message: "Welcome to Sanjog Supplier-server!" });
});

app.get("*", (req, res) => {
  res.send({ message: "Routes Not Found" });
});


app.use(errorHandler);
(async()=>{
  try{
    await dbconnection.sync()
    console.log("Database successfully connected");
  }catch(err){
    console.log("Error", err);
  }
})();



export { app };
