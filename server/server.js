import dotenv from 'dotenv';

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
//import db from "./src/models";
import authRoutes from "./routes/auth.js";
import sequelize from "./db/connection.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
