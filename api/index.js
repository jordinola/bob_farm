import express from "express";
import { addTransaction, getAllTransactions, isInWithinRate } from "./inmemory/transactions.js";

const app = express();
const PORT = 3000;

// Declare a simple route
app.get('/', (req, res) => {
  res.send(getAllTransactions());
});

app.post('/transaction', (req, res) => {
  const date = new Date();
  if (!isInWithinRate(date)) {
    console.log('Rate limit exceeded. Transaction not added.');
    return res.status(429).send('Rate limit exceeded. Please wait before adding another transaction.');
  }

  addTransaction(date);
  return res.status(201).send('Transaction added successfully');
});

// Starting the server
app.listen(PORT, (() => {
    console.log(`Server is running on http://localhost:${PORT}`);
}))