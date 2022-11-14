import app from "./app";

import { config } from "dotenv";
import connectToDatabase from "./config/database";
config({ path: ".env" });

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

const StartServer = async () => {
  try {
    app.listen(PORT, connectToDatabase);
  } catch (error) {
    console.log(error)
  }
};

StartServer();
