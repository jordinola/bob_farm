import cors from "cors";
import express from "express";
import {
  addTransaction,
  countAllTransactions,
  countTodayTransactions,
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

app.get("/api/corn", (req, res) => {
  const pageNumber = parseInt(req.query.pageNumber);
  const pageSize = parseInt(req.query.pageSize);
  const data = getAllTransactions(pageNumber, pageSize);
  const totalPages = Math.ceil(countAllTransactions() / pageSize);

  if (data.length > 0) {
    const response = {
      pageNumber: pageNumber ? parseInt(pageNumber) : 1,
      pageSize: pageSize ? parseInt(pageSize) : 10,
      totalPages: totalPages,
      data: data,
      counters: {
        total: countAllTransactions(),
        today: countTodayTransactions(),
      },
    };

    return res.send(response);
  }

  const response = {
    pageNumber: 1,
    pageSize: 5,
    totalPages: Math.ceil(countAllTransactions() / pageSize),
    data: getAllTransactions(1, 5),
    counters: {
      total: countAllTransactions(),
      today: countTodayTransactions(),
    },
  };

  return res.send(response);
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
