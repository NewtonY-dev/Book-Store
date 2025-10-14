import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import BookRouter from "./routes/bookRoutes.js";
import { connectToDatabase } from "./lib/db.js";

const app = express();
app.use(express.json());
app.use(cors());

//Route handlers
app.use("/auth", authRouter);
app.use("/books", BookRouter);

// 🚨 2. Wrap the listen call in a function to wait for the DB connection
const startServer = async () => {
  try {
    // Attempt to connect to the DB first. This call will log success or throw an error.
    await connectToDatabase();

    // Start the server only after a successful DB connection
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on port ${process.env.SERVER_PORT}`);
    });
  } catch (error) {
    // If the connection failed, log the error and exit the application
    console.error("Failed to start server due to database connection error.");
    process.exit(1);
  }
};

startServer();
