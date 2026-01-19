import { useState } from "react";
import { addTransaction, fetchTranstactions } from "../api/transactions";
import type { TransactionItem } from "../types/table";

export const useCornTransactions = () => {
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);

  const buyCorn = async () => {
    addTransaction();
  };

  const getCornTransactions = async () => {
    const data = await fetchTranstactions();
    return await data;
  };

  return {
    transactions,
    setTransactions,
    buyCorn,
    getCornTransactions,
  };
};

export default useCornTransactions;
