import cors from "cors";
import express from "express";
import {
  addTransaction,
  getAllTransactions,
  isInWithinRate,
} from "./inmemory/transactions.js";

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: "http://localhost:5173", // Adjust this to your frontend's origin
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Declare a simple route
app.get("/api/corn", (req, res) => {
  res.send(getAllTransactions());
});

app.post("/api/corn", (req, res) => {
  const date = new Date();
  if (!isInWithinRate(date)) {
    console.log("Rate limit exceeded. Transaction not added.");
    return res
      .status(429)
      .send(
        "Rate limit exceeded. Please wait before adding another transaction.",
      );
  }

  addTransaction(date);
  return res.status(201).send("Transaction added successfully");
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
