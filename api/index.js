import express from "express";
import { getAllTransactions } from "./inmemory/transactions.js";

const app = express();
const PORT = 3000;

// Declare a simple route
app.get('/', (req, res) => {
  res.send(getAllTransactions());
});

// Starting the server
app.listen(PORT, (() => {
    console.log(`Server is running on http://localhost:${PORT}`);
}))