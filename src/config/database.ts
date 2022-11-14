import { connect, connection } from "mongoose";
import { config } from "dotenv";

config({ path: ".env" });

// Connecting to database
const connectToDatabase = async function () {
  const MONGO_URI: string = process.env.MONGO_URI as string;

  const options: object = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    connect(MONGO_URI, options);
    connection.on("connected", (): void => {
      console.log(
        `Connected to database and running on PORT ${process.env.PORT}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectToDatabase;
